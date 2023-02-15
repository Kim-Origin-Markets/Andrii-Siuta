import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoApiService} from '../todo-api.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ITodoItem} from '../todo.model';
import {NavigationAction} from '../../ui-kit/header/header.component';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  readonly navigation = NavigationAction;
  readonly editForm = new FormGroup({
    id: new FormControl(''),
    label: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    done: new FormControl(false)
  });

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly todoApiService: TodoApiService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    // one of possible ways to get data from route
    // also we can pass whole card data { ROUTE DATA }
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => this.todoApiService.getTodoById(params.id))
    ).subscribe((formData: ITodoItem) => {
      this.editForm.setValue(formData);
    });
  }

  onSubmit() {
    this.todoApiService.updateTodo(this.editForm.value).subscribe(() => {
      this.router.navigateByUrl(`todo-list/${this.navigation.LIST}`);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
