import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoContainerComponent} from './todo-container.component';
import {AddTodoComponent} from './add/add-todo.component';
import {ListComponent} from './list/list.component';
import {EditTodoComponent} from './edit/edit-todo.component';

const routes: Routes = [{
  path: '',
  component: TodoContainerComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }, {
    path: 'add',
    component: AddTodoComponent
  }, {
    path: 'list',
    component: ListComponent
  }, {
    path: 'edit/:id',
    component: EditTodoComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TodoRoutingModule {
}
