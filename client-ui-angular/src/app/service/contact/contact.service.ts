import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  sendEmail = "/social/sendContactEmail";

  constructor(private http: HttpClient) { }

  sendContactEmail(from, name, subject, msg): Observable<any>{
    const body = {
        from: from,
        name: name,
        subject: subject,
        message: msg
    };
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.sendEmail, body, httpOptions);
  }
}
