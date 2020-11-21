import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../service/userStore/user-store.service';
import { TenantStoreService } from '../../service/tenantStore/tenant-store.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../service/websocket/message';
import { SocketService } from '../../service/websocket/socket.service';
import { EmployeeService } from '../../shared/employee/employee.service';

@Component({
  selector: 'app-chat-messenger',
  templateUrl: './chat-messenger.component.html',
  styleUrls: ['./chat-messenger.component.css']
})
export class ChatMessengerComponent implements OnInit {

  unreadMessage = true;
  name: string;
  loading = false;

  constructor(public userStore: UserStoreService, private tenantStore: TenantStoreService,
    private socketService: SocketService, private empService: EmployeeService) { }

  ngOnInit(): void {
    this.name = this.tenantStore.tenantEmail;

    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    })
    this.userForm = new FormGroup({
      fromId: new FormControl(null, [Validators.required]),
      toId: new FormControl(null)
    })
    this.initializeWebSocketConnection();
  }

  private serverUrl = environment.backendBaseUrl + '/socket'
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  stompClient: any;
  public form: FormGroup;
  public userForm: FormGroup;
  messages: Message[] = [];
  newMessage: string = '';

  sendMessageUsingSocket() {
    /*if (this.form.valid) {
      let message: Message = { message: this.form.value.message, fromId: this.tenantStore.tenantId + "-" + this.userStore.userId,
                               toId: this.tenantStore.tenantId + "-" + this.userForm.value.toId };
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
    }*/
    let message: Message = { message: this.newMessage, fromId: this.tenantStore.tenantId + "-" + this.userStore.userId,
                               toId: this.tenantStore.tenantId + "-" + this.userForm.value.toId };
    this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
    this.newMessage = '';
  }

  sendMessageUsingRest() {
    if (this.form.valid) {
      let message: Message = { message: this.form.value.message, fromId: this.tenantStore.tenantId + "-" + this.userStore.userId,
                               toId: this.tenantStore.tenantId + "-" + this.userForm.value.toId };
      this.socketService.post(message).subscribe((data: Message) => {
        console.log(data);
      },
      (error:any) => {
          return new Error(error);
      });
    }
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    //disabe stomp console logs
    if(environment.production === true){
      this.stompClient.debug = null;
    }
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.isLoaded = true;
      that.openGlobalSocket();
      that.openSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe("/socket-publisher", (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + this.tenantStore.tenantId +"-" +
                        this.userStore.userId, (message) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message){
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
    }
  }

  getCurrentUserIdWithTenant(): string{
    return this.tenantStore.tenantId + "-" + this.userStore.userId;
  }

  scan(){

  //   cordova.plugins.barcodeScanner.scan(
  //     function (result) {
  //         alert("We got a barcode\n" +
  //               "Result: " + result.text + "\n" +
  //               "Format: " + result.format + "\n" +
  //               "Cancelled: " + result.cancelled);
  //     },
  //     function (error) {
  //         alert("Scanning failed: " + error);
  //     }
  //  );

  //   this.$cordovabarcodescanner.scan(
  //     function (result) {
  //         alert("We got a barcode\n" +
  //               "Result: " + result.text + "\n" +
  //               "Format: " + result.format + "\n" +
  //               "Cancelled: " + result.cancelled);
  //     },
  //     function (error) {
  //         alert("Scanning failed: " + error);
  //     }
  //  );
  }

}
