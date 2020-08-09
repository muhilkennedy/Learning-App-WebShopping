import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AlertService } from '../../shared/_alert';
import { TaskService } from '../../shared/task/task.service';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UserStoreService } from '../../service/userStore/user-store.service';

@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.scss']
})
export class TaskComponent implements OnInit {

  loading = false;
  createCard = false;
  sub: Subscription;
  userPermissions:any[];
  isCreateTaskAllowed = false;

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
              private userStore: UserStoreService) {
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
                          alert('failed');
                        }
                      },
                      (error:any) => {
                        alert('failed');
                      });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.createCard = params['isTaskpage'];
      });
    this.taskService.getCreatedTask()
                    .subscribe((resp:any) => {
                      if(resp.statusCode  === 200){
                        this.createdTasks = resp.dataList;
                      }
                      else{
                        alert('failed');
                      }
                    },
                    (error:any) => {
                      alert('failed');
                    });

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
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
    this.taskService.createTask(this.content, this.assigneeId, this.endDate)
                    .subscribe((resp:any) => {
                      if(resp.statusCode  === 200){
                        this.createdTasks = resp.dataList;
                      }
                      else{
                        alert('failed');
                      }
                    },
                    (error:any) => {
                      alert('failed');
                    });
  }

  removeTask(task:any){
    this.taskService.removeTask(task.taskId)
                    .subscribe((resp:any) => {
                      if(resp.statusCode  === 200){
                        this.createdTasks = resp.dataList;
                      }
                      else{
                        alert('failed');
                      }
                    },
                    (error:any) => {
                      alert('failed');
                    });
  }

  completeTask(task:any){
    this.taskService.updateTask(task.taskId, 'Completed')
                    .subscribe((resp:any) => {
                      if(resp.statusCode  === 200){
                        this.assignedTasks = resp.dataList;
                      }
                      else{
                        alert('failed');
                      }
                    },
                    (error:any) => {
                      alert('failed');
                    });
  }

  action(event){

  }

}
