import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  homemediaEndPoint = "/base/homeMedia";

  constructor(private http: HttpClient) { }

  getAllHomeMedia(): Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.homemediaEndPoint);
  }

}
