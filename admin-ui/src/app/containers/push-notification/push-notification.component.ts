import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../../shared/notification/notification.service';
import { AlertService } from '../../shared/_alert';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../service/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../shared/task/task.service';
import { PushNotificationsService } from 'ng-push';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {

  notifications:any[] = new Array();
  loading = true;

  @Input() notificationCount: number;
  @Input() taskCount: number;

  @Output('updateNotification') notificationChanges: EventEmitter<number> = new EventEmitter<number>();
  emitNotificationChanges() {
    this.notificationChanges.emit(this.notificationCount);
  }

  @Output('updatetaskCount') updatetaskCount: EventEmitter<number> = new EventEmitter<number>();
  emitUpdatetaskCount() {
    this.updatetaskCount.emit(this.taskCount);
  }

  constructor(private notificationService: NotificationService,
              private alertService: AlertService,
              private cookieService: CookieService,
              private loginService: LoginService,
              private _snackBar: MatSnackBar,
              private taskService: TaskService,
              private _pushNotifications: PushNotificationsService,
              private tenantStore: TenantStoreService) { }

  ngOnInit(): void {
    let allowCall =this.cookieService.get('JWT');
    let notificationInterval;
    let loggedStatusInterval;
    let productNotificationInterval;
    if(allowCall != null && allowCall != undefined && allowCall != ''){
        this.getNotifications();
        this.checkTaskCount();
        this.getProductNotifications();
        notificationInterval = setInterval(() => { this.getNotifications() }, 60000);
        productNotificationInterval = setInterval(() => { this.getProductNotifications() }, 30000);
       //need to moved to related method later.
       loggedStatusInterval = setInterval(() => { this.updateLoggedInStatus() }, 50000);

    }
    else{
      clearInterval(notificationInterval);
      clearInterval(loggedStatusInterval);
    }
  }

  getNotifications(){
    this.notificationService.getAllNotifications()
                            .subscribe((resp:any) => {
                              if(resp.statusCode === 200){
                                let notifications = resp.dataList;
                                if(notifications !== null && notifications!== undefined){
                                 this.setNotifications(notifications);
                                }
                                if(this.notifications.length > 0 && this.notificationCount !== this.notifications.length){
                                  this.checkTaskCount();
                                  this.notificationCount = this.notifications.length;
                                  this._snackBar.open('You Have a New Notification(s)!', '', {
                                    duration: 5000,
                                    panelClass: ['warn-snackbar']
                                  });
                                }
                                this.emitNotificationChanges();
                              }
                            });
  }

  setNotifications(notifications){
    notifications.forEach(element => {
      if(!this.isnotificationPresent(element.notificationId)){
        this.notifications.push(element);
        let options = {
          body: element.content,
          icon: this.tenantStore.tenantLogo
        }
        this._pushNotifications.create(this.tenantStore.tenantName, options)
                                .subscribe(
                                      res => console.log(res),
                                      err => console.log(err)
                                );
      }
    });
  }

  isnotificationPresent(notifyId){
    let isPresent = false;
    this.notifications.forEach(notification => {
      if(notification.notificationId === notifyId){
        isPresent = true;
      }
    });
    return isPresent;
  }

  removeNotification(notifyId){
    let i = 0;
    this.notifications.forEach(notification => {
      if(notification.notificationId === notifyId){
        this.notifications.splice(i, 1);
        i++;
      }
    });
  }

  getProductNotifications(){
    this.notificationService.getAllProductNotifications()
                            .subscribe((resp:any) => {
                              if(resp.statusCode === 200){
                                let notifications = resp.dataList;
                                if(notifications !== null && notifications!== undefined){
                                  this.setNotifications(notifications);
                                }
                                if(this.notifications.length > 0 && this.notificationCount !== this.notifications.length){
                                  this.notificationCount = this.notifications.length;
                                  this._snackBar.open('You Have a New Notification(s)!', '', {
                                    duration: 5000,
                                    panelClass: ['warn-snackbar']
                                  });
                                }
                                this.emitNotificationChanges();
                              }
                            });
  }

  checkTaskCount(){
    this.taskService.getPendingOverdueCount()
                    .subscribe((resp:any) => {
                      if(resp.statusCode === 200){
                        this.taskCount = resp.data;
                      }
                      this.emitUpdatetaskCount();
                    });
  }

  clearNotification(notification:any){
    if(notification.productId !== undefined){
      this.notificationService.deleteProductNotification(notification.notificationId)
                              .subscribe((resp:any) => {
                                if(resp.statusCode === 200){
                                  this.removeNotification(notification.notificationId);
                                  this.notificationCount -= 1;
                                }
                                this.emitNotificationChanges();
                              });
    }
    else{
      this.notificationService.deleteNotification(notification.notificationId)
                              .subscribe((resp:any) => {
                                if(resp.statusCode === 200){
                                  this.removeNotification(notification.notificationId);
                                  this.notificationCount -= 1;
                                }
                                this.emitNotificationChanges();
                              });
    }
  }

  updateLoggedInStatus(){
    this.loginService.updateLoginStatus()
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){

                        }
                      });
  }

}
