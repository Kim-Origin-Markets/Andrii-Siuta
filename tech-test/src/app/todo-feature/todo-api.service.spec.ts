import {TodoApiService} from './todo-api.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {ITodoItem} from './todo.model';

describe('TodoApiService', () => {
  let service: TodoApiService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    service = new TodoApiService(null);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TodoApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todos', () => {
    service.getTodos().subscribe((todos) => {
      expect(todos).toEqual([]);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toEqual('GET');

    req.flush([]);
  });

  it('should get todo by id', () => {
    service.getTodoById(1).subscribe(console.log);
    const req = httpTestingController.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toEqual('GET');
  });

  it('should add todo', () => {
    const todo: ITodoItem = {
      id: 1,
      label: 'test',
      done: false,
      description: 'test',
      category: 'test'
    };
    service.addTodo(todo).subscribe((todo) => expect(todo).toEqual(todo));
    const req = httpTestingController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toEqual('POST');

    req.flush(todo);
  });

  it('should update todo', () => {
    const todo: ITodoItem = {
      id: 1,
      label: 'test',
      done: false,
      description: 'test',
      category: 'test'
    };
    service.updateTodo(todo).subscribe((todo) => expect(todo).toEqual(todo));
    const req = httpTestingController.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toEqual('PATCH');
    req.flush(todo);
  });

  it('should delete todo', () => {
    service.deleteTodo(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toEqual('DELETE');
  });
});
