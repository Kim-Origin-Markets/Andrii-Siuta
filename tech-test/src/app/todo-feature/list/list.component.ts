import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {combineLatest} from 'rxjs';
import {Router} from '@angular/router';
import {TodoAction} from '../item/todo-item.component';
import {TodoFacade} from '../todo.service';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoFacade]
})
export class ListComponent implements OnInit {
  readonly state$ = combineLatest([
    this.todoFacade.filteredTodos$,
    this.todoFacade.categories$
  ]).pipe(
    map(([todos, categories]) => ({todos, categories})
    ));
  readonly form = new FormGroup({
    filters: new FormControl([]),
  });

  constructor(
    private readonly router: Router,
    private readonly todoFacade: TodoFacade,
  ) {
  }

  ngOnInit(): void {
    this.filterControl.valueChanges.pipe(
      takeUntil(this.todoFacade.destroy$),
    ).subscribe((value: string[]) => {
        this.todoFacade.filterTodos(value);
      }
    );
  }

  onAction(action: { action: TodoAction, id: number }) {
    switch (action.action) {
      case TodoAction.DELETE:
        this.todoFacade.deleteTodoById(action.id);
        return;
      case TodoAction.EDIT:
        this.router.navigateByUrl(`todo-list/edit/${action.id}`);
        break;
    }
  }

  private get filterControl(): FormControl {
    return this.form.get('filters') as FormControl;
  }
}
