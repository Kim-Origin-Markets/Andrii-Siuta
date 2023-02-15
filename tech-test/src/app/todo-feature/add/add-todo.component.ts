import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NavigationAction} from '../../ui-kit/header/header.component';
import {TodoApiService} from '../todo-api.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent implements OnDestroy {
  addForm = new FormGroup({
    id: new FormControl(''),
    label: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    done: new FormControl({value: false, disabled: true})
  });

  private readonly navigation = NavigationAction;
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private todoApiService: TodoApiService
  ) {
  }

  onSubmit() {
    // raw value coz no done in state if disabled
    this.todoApiService.addTodo(this.addForm.getRawValue()).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigateByUrl(`todo-list/${this.navigation.LIST}`);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
