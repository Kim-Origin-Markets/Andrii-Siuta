import {Observable} from 'rxjs';

export interface ITodoItem {
  id: number;
  label: string;
  description: string;
  category: string;
  done: boolean;
}

export interface ITodoService {
  getTodos(): Observable<ITodoItem[]>;

  getTodoById(id: number): Observable<ITodoItem>;

  addTodo(todo: ITodoItem): Observable<ITodoItem>;

  updateTodo(todo: ITodoItem): Observable<ITodoItem>;

  deleteTodo(id: number): Observable<ITodoItem>;

  filterTodos(filter: string): Observable<ITodoItem[]>;
}
