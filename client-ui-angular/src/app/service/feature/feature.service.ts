import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  getFeatureStatusEndpoint = "/feature/getFeatureStatus";

  constructor(private http: HttpClient) { }

  getFeatureStatus(featureName): Observable<any>{
    const httpOptions = {
      params: {
        featureName: featureName
      }
    };
    return this.http.get(environment.backendBaseUrl+this.getFeatureStatusEndpoint, httpOptions);
  }
}
