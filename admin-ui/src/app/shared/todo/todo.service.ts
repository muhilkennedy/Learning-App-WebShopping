import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  createTodoEndpoint = "/secure/admin/todo/addTodo"
  updateTodoEndpoint = "/secure/admin/todo/updateTodo";
  removeTodoEndpoint = "/secure/admin/todo/deleteTodo";
  getTodoEndpoint = "/secure/admin/todo/getTodo";

  constructor(private http: HttpClient) { }

  createTodo(content): Observable<any> {
    const body = {
      content: content
    }
    return this.http.post(environment.backendBaseUrl+this.createTodoEndpoint, body);
  }

  updateTodo(id): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('id', id);
    return this.http.put(environment.backendBaseUrl+this.updateTodoEndpoint, uploadData);
  }

  getAllTodo(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getTodoEndpoint);
  }

  removeTodo(id){
    const httpOptions = {
      params: {id: id}
    };
    return this.http.delete(environment.backendBaseUrl+this.removeTodoEndpoint, httpOptions);
  }

}
