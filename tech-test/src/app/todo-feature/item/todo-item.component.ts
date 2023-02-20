import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITodoItem} from '../todo.model';

export enum TodoAction {
  EDIT = 'edit',
  DELETE = 'delete'
}

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  readonly actions = TodoAction;
  @Input() item: ITodoItem;

  @Output() actionClick = new EventEmitter<{ action: TodoAction, id: number }>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onAction(action: TodoAction, id: number) {
    this.actionClick.emit({action, id});
  }
}
