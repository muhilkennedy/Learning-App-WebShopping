import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../../shared/todo/todo.service';
import { AlertService } from '../../../../shared/_alert';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
              private alertService: AlertService,
              private cookieService: CookieService,
              private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    let allowCall =this.cookieService.get('JWT');
    if(allowCall != null && allowCall != undefined && allowCall != ''){
      this.loading = true;
      this.todoService.getAllTodo()
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.toDoListArray = resp.dataList;
                      }
                      else{
                        this._snackBar.open('Failed : ' + resp.errorMessages, '', {
                          duration: 3000,
                          panelClass: ['error-snackbar']
                        });
                        //this.alertService.error('Failed : ' + resp.errorMessages);
                      }
                      this.loading = false;
                    },
                    (error) => {
                      this._snackBar.open('Something went wrong....try again later!', '', {
                        duration: 3000,
                        panelClass: ['error-snackbar']
                      });
                      //this.alertService.error('Something went wrong....try again later!');
                    });
    }
  }

  onAdd() {
    this.loading = true;
    if(this.content === '' || this.content === undefined){
      this._snackBar.open('Please add what you want to DO !', 'OK', {
        duration: 3000,
        panelClass: ['warn-snackbar']
      });
      return;
    }
    this.todoService.createTodo(this.content)
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.toDoListArray = resp.dataList;
                        this.content = '';
                      }
                      else{
                        this._snackBar.open('Failed : ' + resp.errorMessages, '', {
                          duration: 3000,
                          panelClass: ['error-snackbar']
                        });
                      }
                      this.loading = false;
                    },
                    (error) => {
                      this._snackBar.open('Something went wrong....try again later!', '', {
                        duration: 3000,
                        panelClass: ['error-snackbar']
                      });
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
                        this._snackBar.open('Failed : ' + resp.errorMessages, '', {
                          duration: 3000,
                          panelClass: ['error-snackbar']
                        });
                      }
                      this.loading = false;
                    },
                    (error) => {
                      this._snackBar.open('Something went wrong....try again later!', '', {
                        duration: 3000,
                        panelClass: ['error-snackbar']
                      });
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
                        this._snackBar.open('Failed : ' + resp.errorMessages, '', {
                          duration: 3000,
                          panelClass: ['error-snackbar']
                        });
                      }
                      this.loading = false;
                    },
                    (error) => {
                      this._snackBar.open('Something went wrong....try again later!', '', {
                        duration: 3000,
                        panelClass: ['error-snackbar']
                      });
                    });
  }

}
