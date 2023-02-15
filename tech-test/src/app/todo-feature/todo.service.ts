import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ITodoItem} from './todo.model';
import {TodoApiService} from './todo-api.service';

@Injectable()
export class TodoFacade implements OnDestroy {

  private initStatus = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line:variable-name
  private _todos = new BehaviorSubject<ITodoItem[]>([]);
  // tslint:disable-next-line:variable-name
  private _categories = new BehaviorSubject<string[]>([]);

  // tslint:disable-next-line:variable-name
  private _filteredTodos = new BehaviorSubject<ITodoItem[]>([]);

  public destroy$ = new Subject();

  readonly filteredTodos$ = this._filteredTodos.asObservable();
  readonly categories$ = this._categories.asObservable();

  constructor(
    private readonly todoApiService: TodoApiService
  ) {
    this.fetchTodos();
  }

  public get initStatus$(): Observable<boolean> {
    return this.initStatus.asObservable();
  }

  public deleteTodoById(id: number): void {
    this.todoApiService.deleteTodo(id).subscribe(() => {
      this._filteredTodos.next(this._filteredTodos.value.filter(todo => todo.id !== id));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async fetchTodos(): Promise<void> {
    const todos = await this.todoApiService.getTodos().toPromise();
    this._todos.next(todos);
    this._filteredTodos.next(todos);
    this.setupCategories(todos);
  }

  private setupCategories(todos: ITodoItem[]): void {
    const categories = todos.map(todo => todo.category);
    this._categories.next([...new Set(categories)]);
  }

  filterTodos(filter: string[]) {
    console.log(filter);
    if (filter.length === 0) {
      this.fetchTodos();
    }
    const filteredTodos = this._todos.value.filter(todo => filter.includes(todo.category));
    this._filteredTodos.next(filteredTodos);
  }
}
