import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getCreatedTaskEndpoint = "/secure/admin/task/getCreatedTasks";
  getAssignedTaskEndpoint = "/secure/admin/task/getAssignedTasks";
  createTaskEndpoint = "/secure/admin/task/createTask";
  getAllEmployeeNamesAndEmailEndpoint = "/secure/admin/employee/getAllEmployeeNames";
  deleteTaskEndpoint = "/secure/admin/task/deleteTask";
  updateTaskEndpoint = "/secure/admin/task/updateTask";
  getPendingOverdueCountEndpoint = "/secure/admin/task/getPendingOverdueTaskCount";

  resetDashboardScheduledTaskEndpoint = "/secure/admin/scheduledtask/triggerResetDashBoardTask";
  deleteCategoryScheduledTaskEndpoint = "/secure/admin/scheduledtask/triggerDeleteCategoryTask";
  taskUpdateScheduledTaskEndpoint= "/secure/admin/scheduledtask/triggerTaskUpdateTask";
  deactivateCouponsTaskEndpoint = "/secure/admin/scheduledtask/triggerDeactivateCouponsTask";

  constructor(private http: HttpClient) { }

  getAssignedTask(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getAssignedTaskEndpoint);
  }

  getPendingOverdueCount(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getPendingOverdueCountEndpoint);
  }

  getCreatedTask(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getCreatedTaskEndpoint);
  }

  createTask(content, assigneeId, duedate): Observable<any> {
    const body = {
      assigneeId : assigneeId,
      content : content,
      enddate : duedate
    }
    return this.http.post(environment.backendBaseUrl+this.createTaskEndpoint, body);
  }

  getAllEmployeeNamesAndEmail(): Observable<any> {
    return this.http.get(environment.backendBaseUrl+this.getAllEmployeeNamesAndEmailEndpoint);
  }

  removeTask(id){
    const httpOptions = {
      params: {id: id}
    };
    return this.http.delete(environment.backendBaseUrl+this.deleteTaskEndpoint, httpOptions);
  }

  updateTask(id, status){
    const body = {
      taskId : id,
      status : status
    }
    return this.http.put(environment.backendBaseUrl+this.updateTaskEndpoint, body);
  }

  resetDashboardScheduled(): Observable<any> {
    return this.http.post(environment.backendBaseUrl+this.resetDashboardScheduledTaskEndpoint, null);
  }

  deleteCategoryScheduledTask(): Observable<any> {
    return this.http.post(environment.backendBaseUrl+this.deleteCategoryScheduledTaskEndpoint, null);
  }

  taskUpdateScheduledTask(): Observable<any> {
    return this.http.post(environment.backendBaseUrl+this.taskUpdateScheduledTaskEndpoint, null);
  }

  deactivateCouponsScheduledTask(): Observable<any> {
    return this.http.post(environment.backendBaseUrl+this.deactivateCouponsTaskEndpoint, null);
  }

}
