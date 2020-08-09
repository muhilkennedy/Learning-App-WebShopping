import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../../shared/todo/todo.service';
import { AlertService } from '../../../../shared/_alert';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  toDoListArray:any = new Array();
  loading = false;
  content: string;
  date:Date = new Date();

  constructor(private todoService: TodoService,
              private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.todoService.getAllTodo()
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.toDoListArray = resp.dataList;
                      }
                      else{
                        this.alertService.error('Failed : ' + resp.errorMessages);
                      }
                      this.loading = false;
                    },
                    (error) => {
                      this.alertService.error('Something went wrong....try again later!');
                    });
  }

  onAdd() {
    this.loading = true;
    this.todoService.createTodo(this.content)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.toDoListArray = resp.dataList;
                        this.content = '';
                      }
                      else{
                        this.alertService.error('Failed : ' + resp.errorMessages);
                      }
                      this.loading = false;
                    },
                    (error) => {
                      this.alertService.error('Something went wrong....try again later!');
                    });
  }

  changeStatus(item:any) {
    this.loading = true;
    this.todoService.updateTodo(item.todoId)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.toDoListArray = resp.dataList;
                      }
                      else{
                        this.alertService.error('Failed : ' + resp.errorMessages);
                      }
                      this.loading = false;
                    },
                    (error) => {
                      this.alertService.error('Something went wrong....try again later!');
                    });
  }

  removeTodo(item:any){
    this.loading = true;
    this.todoService.removeTodo(item.todoId)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.toDoListArray = resp.dataList;
                      }
                      else{
                        this.alertService.error('Failed : ' + resp.errorMessages);
                      }
                      this.loading = false;
                    },
                    (error) => {
                      this.alertService.error('Something went wrong....try again later!');
                    });
  }

}
