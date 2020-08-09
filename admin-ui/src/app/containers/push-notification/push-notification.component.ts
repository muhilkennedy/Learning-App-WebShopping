import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/notification/notification.service';
import { AlertService } from '../../shared/_alert';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {

  notifications:any[] = new Array();
  loading = true;

  constructor(private notificationService: NotificationService,
              private alertService: AlertService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    let allowCall =this.cookieService.get('JWT');
      if(allowCall != null && allowCall != undefined && allowCall != ''){
        this.getNotifications();
        setInterval(() => { this.getNotifications() }, 60000);
    }

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
