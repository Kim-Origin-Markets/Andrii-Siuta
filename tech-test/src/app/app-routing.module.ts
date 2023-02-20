import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'todo-list',
}, {
  path: 'todo-list',
  loadChildren: () => import('./todo-feature/todo.module').then(m => m.TodoModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
