import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AlertService } from '../../shared/_alert';
import { TaskService } from '../../shared/task/task.service';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.scss']
})
export class TaskComponent implements OnInit {

  loading = false;
  createLoading = false;
  createCard = false;
  sub: Subscription;
  userPermissions:any[];
  isCreateTaskAllowed = false;
  makeCallOninit = false;

  // MatPaginator Inputs
  offset = 0;
  total = 10;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 50];

  //autoComplete
  myControl = new FormControl('', [
    Validators.required
  ]);
  options: any[];
  filteredOptions: Observable<any[]>;

  assigneeId: number;
  endDate: Date = new Date();
  content: string;

  assignedTasks: any[] = new Array();
  createdTasks: any[] = new Array();

  selectedStatus = '';
  changeSlected(event){
    this.selectedStatus = event.target.value;
  }

  dateFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private route: ActivatedRoute,
              private alertService: AlertService,
              private taskService: TaskService,
              private userStore: UserStoreService,
              private cookieService: CookieService) {
      let allowCall =this.cookieService.get('JWT');
      if(allowCall != null && allowCall != undefined && allowCall != ''){
        this.makeCallOninit = true;
        this.loading = true;
        //show create card for only admin and manager permission
        let onLoad = setInterval(() => {
          this.userPermissions = this.userStore.employeePermissions;
          if(this.userPermissions != undefined && this.userPermissions.length > 0){
            let permissionIds = new Array(4);
            this.userPermissions.forEach(permission => {
              permissionIds.push(permission.permission.permissionId);
            });
            if(permissionIds.includes(1) || permissionIds.includes(2)){
              this.isCreateTaskAllowed = true;
            }

            clearInterval(onLoad);
          }
        }, 500);
        //get all assigned tasks
        this.taskService.getAssignedTask()
                        .subscribe((resp:any) => {
                          if(resp.statusCode  === 200){
                            this.assignedTasks = resp.dataList;
                          }
                          this.loading = false;
                        },
                        (error) => {
                          this.loading = false;
                        });
        this.taskService.getAllEmployeeNamesAndEmail()
                        .subscribe((resp:any) => {
                          if(resp.statusCode  === 200){
                            this.options = resp.dataList;
                            this.filteredOptions = this.myControl.valueChanges.pipe(
                              startWith(''),
                              map(value => this._filter(value))
                            );
                          }
                          else{
                            this.alertService.error('Failed : ' + resp.errorMessages);
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this.alertService.error("something went wrong!");
                          this.loading = false;
                        });
      }

  }

  ngOnInit(): void {
    if(this.makeCallOninit){
      this.createLoading = true;
      this.sub = this.route.params.subscribe(params => {
        this.createCard = params['isTaskpage'];
      });
      this.taskService.getCreatedTask()
                    .subscribe((resp:any) => {
                      if(resp.statusCode  === 200){
                        this.createdTasks = resp.dataList;
                      }
                      else{
                        this.alertService.error('Failed : ' + resp.errorMessages);
                      }
                      this.createLoading = false;
                    },
                    (error:any) => {
                      this.alertService.error("something went wrong!");
                      this.createLoading = false;
                    });
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
  }

  showTaskActions(): boolean{
    if(this.createCard){
      return true;
    }
    else{
      return false;
    }
  }

  showCreateCard(): boolean{
    if(this.createCard && this.isCreateTaskAllowed){
      return true;
    }
    else{
      return false;
    }
  }

  setUser(user:any)
  {
    this.assigneeId = user.employeeId;
  }

  setEndDate(type: string, event: MatDatepickerInputEvent<Date>){
    this.endDate = event.value;
  }

  createTask(){
    this.createLoading = true;
    this.taskService.createTask(this.content, this.assigneeId, this.endDate)
                    .subscribe((resp:any) => {
                      if(resp.statusCode  === 200){
                        this.createdTasks = resp.dataList;
                      }
                      else{
                        this.alertService.error('Failed : ' + resp.errorMessages);
                      }
                      this.createLoading = false;
                    },
                    (error:any) => {
                      this.alertService.error("something went wrong!");
                      this.createLoading = false;
                    });
  }

  removeTask(task:any){
    this.createLoading = true;
    this.taskService.removeTask(task.taskId)
                    .subscribe((resp:any) => {
                      if(resp.statusCode  === 200){
                        this.createdTasks = resp.dataList;
                      }
                      else{
                      }
                      this.createLoading = false;
                    },
                    (error:any) => {
                      this.alertService.error("something went wrong!");
                      this.createLoading = false;
                    });
  }

  completeTask(task:any){
    this.loading = true;
    this.taskService.updateTask(task.taskId, 'Completed')
                    .subscribe((resp:any) => {
                      if(resp.statusCode  === 200){
                        this.assignedTasks = resp.dataList;
                      }
                      else{
                        this.alertService.error('Failed : ' + resp.errorMessages);
                      }
                      this.loading = false;
                    },
                    (error:any) => {
                      this.alertService.error("something went wrong!");
                      this.loading = false;
                    });
  }

  action(event){

  }

}
