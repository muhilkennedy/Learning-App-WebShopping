import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/notification/notification.service';
import { AlertService } from '../../shared/_alert';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {

  notifications:any[];
  loading = true;

  constructor(private notificationService: NotificationService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.getNotifications();
    setInterval(() => { this.getNotifications() }, 60000);
  }

  getNotifications(){
    this.notificationService.getAllNotifications()
                            .subscribe((resp:any) => {
                              if(resp.statusCode === 200){
                                this.notifications = resp.dataList;
                              }
                            });
  }

  clearNotification(notification:any){
    this.notificationService.deleteNotification(notification.notificationId)
                            .subscribe((resp:any) => {
                              if(resp.statusCode === 200){
                                this.notifications = resp.dataList;
                              }
                            });
  }

}
