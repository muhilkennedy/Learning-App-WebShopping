import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task/task.service';

@Component({
  selector: 'app-scheduled-tasks',
  templateUrl: './scheduled-tasks.component.html',
  styleUrls: ['./scheduled-tasks.component.css']
})
export class ScheduledTasksComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  loading = false;

  ngOnInit(): void {
  }

  dashboardDatasync(){
    this.loading = true;
    this.taskService.resetDashboardScheduled()
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.loading = false;
                      }
                      else{
                        alert('Scheduled Task Error!');
                      }
                    },
                    (error:any) => {
                      alert('Scheduled Task Error!');
                    })
  }

  deleteCategorytask(){
    this.loading = true;
    this.taskService.deleteCategoryScheduledTask()
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.loading = false;
                      }
                      else{
                        alert('Scheduled Task Error!');
                      }
                    },
                    (error:any) => {
                      alert('Scheduled Task Error!');
                    })
  }

}
