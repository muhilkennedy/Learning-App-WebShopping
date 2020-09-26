import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat-messenger',
  templateUrl: './chat-messenger.component.html',
  styleUrls: ['./chat-messenger.component.css']
})
export class ChatMessengerComponent implements OnInit {

  unreadMessage = true;

  constructor(public userStore: UserStoreService, private tenantStore: TenantStoreService) { }

  ngOnInit(): void {
    this.name = this.tenantStore.tenantEmail;
  }

  greeting: any;
  name: string;

  connect(){
    this._connect();
  }

  disconnect(){
    this._disconnect();
  }

  sendMessage(){
    this._send(this.name);
  }

  handleMessage(message){
    this.greeting = message;
  }

  webSocketEndPoint: string = 'http://localhost:8080/wsocket';
    topic: string = "/broadcastchat/sendMessage";
    stompClient: any;

    _connect() {
      console.log("Initialize WebSocket Connection");
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      //disabe stomp console logs
      this.stompClient.debug = null;
      const _this = this;
      _this.stompClient.connect(
        {"Tenant-Id": environment.tenantId,
        "Origin":environment.origin}, function (frame) {
          _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
              _this.onMessageReceived(sdkEvent);
          });
          //_this.stompClient.reconnect_delay = 2000;
      }, this.errorCallBack);
  };

  _disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
      console.log("errorCallBack -> " + error)
      setTimeout(() => {
          this._connect();
      }, 5000);
  }

/**
 * Send message to sever via web socket
 * @param {*} message
 */
  _send(message) {
      this.stompClient.send("/app/msg", {"Tenant-Id": environment.tenantId},
      JSON.stringify({message: message,
                      from: this.userStore.emailId,
                      to:'muhilkennedy@gmail.com',
                      tenantId: environment.tenantId,
                      userToken: this.userStore.JwtToken}));
      this.unreadMessage = false;
  }

  onMessageReceived(message:any) {
    let messageObject = JSON.parse(message.body);
    if(messageObject.reciever === this.userStore.emailId){
      console.log("Message Recieved from Server :: " + message);
      this.unreadMessage = true;
    }

      // this.appComponent.handleMessage(JSON.stringify(message.body));
  }

}
