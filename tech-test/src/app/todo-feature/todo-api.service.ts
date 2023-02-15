import {Injectable} from '@angular/core';
import {ITodoItem, ITodoService} from './todo.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TodoApiService implements ITodoService {
  private httpUrl = 'http://localhost:3000/tasks';

  addTodo(todo: ITodoItem): Observable<ITodoItem> {
    return this.httpClient.post<ITodoItem>(this.httpUrl, todo);
  }

  deleteTodo(id: number): Observable<ITodoItem> {
    return this.httpClient.delete<ITodoItem>(`${this.httpUrl}/${id}`);
  }

  filterTodos(filter: string): Observable<ITodoItem[]> {
    return undefined;
  }

  getTodos(): Observable<ITodoItem[]> {
    return this.httpClient.get<ITodoItem[]>(this.httpUrl);
  }

  getTodoById(id: number): Observable<ITodoItem> {
    return this.httpClient.get<ITodoItem>(`${this.httpUrl}/${id}`);
  }

  updateTodo(todo: ITodoItem): Observable<ITodoItem> {
    return this.httpClient.patch<ITodoItem>(`${this.httpUrl}/${todo.id}`, todo);
  }

  constructor(
    private httpClient: HttpClient
  ) {
  }
}
