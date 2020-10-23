import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  url: string = environment.backendBaseUrl + "/api/socket";

  constructor(private http: HttpClient) { }

  post(data: Message) {
    return this.http.post(this.url, data)
  }

}
