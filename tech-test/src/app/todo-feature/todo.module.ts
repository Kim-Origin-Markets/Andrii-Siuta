import {NgModule} from '@angular/core';
import {TuiCardModule} from '@taiga-ui/addon-commerce';
import {TuiActionModule, TuiCheckboxModule, TuiFilterModule, TuiInputModule, TuiTextAreaModule} from '@taiga-ui/kit';
import {TodoRoutingModule} from './todo-routing.module';
import {UiKitModule} from '../ui-kit/ui-kit.module';
import {ListComponent} from './list/list.component';
import {TuiForModule} from '@taiga-ui/cdk';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {EditTodoComponent} from './edit/edit-todo.component';
import {AddTodoComponent} from './add/add-todo.component';
import {TodoContainerComponent} from './todo-container.component';
import {TuiButtonModule} from '@taiga-ui/core';
import {TodoItemComponent} from './item/todo-item.component';

@NgModule({
  declarations: [
    AddTodoComponent,
    ListComponent,
    EditTodoComponent,
    TodoContainerComponent,
    TodoItemComponent
  ],
  imports: [
    TuiCardModule,
    TuiActionModule,
    TodoRoutingModule,
    UiKitModule,
    TuiForModule,
    CommonModule,
    TuiFilterModule,
    ReactiveFormsModule,
    TuiCheckboxModule,
    TuiInputModule,
    TuiTextAreaModule,
    TuiButtonModule,
  ],
  exports: []
})

export class TodoModule {
}
