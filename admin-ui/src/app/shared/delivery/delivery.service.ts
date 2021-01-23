import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  createPincodeConfigEndpoint = "/secure/admin/delivery/createPincode";
  getAllPinsConfigEndpoint = "/secure/admin/delivery/getAllPincodes";
  togglePinCodeStatusEndpoint = "/secure/admin/delivery/togglePincodeStatus"
  deletePinConfigEndpoint = "/secure/admin/delivery/deletePinCodeConfig";

  constructor(private http: HttpClient) { }

  createConfig(pincode, deliverycharge, minimumamtforfreedelivery,deliveryfromtime, deliverytilltime, minimumdeliveryhours): Observable<any>{
    const body = {
      pincode: pincode,
      deliverycharge: deliverycharge,
      minimumamtforfreedelivery: minimumamtforfreedelivery,
      deliveryfromtime: deliveryfromtime,
      deliverytilltime: deliverytilltime,
      minimumdeliveryhours: minimumdeliveryhours
    }
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.createPincodeConfigEndpoint, body, httpOptions);
    }

    togglePinConfigStatus(pincode): Observable<any>{
      const uploadData = new FormData();
      uploadData.append('pincode', pincode);
      return this.http.put(environment.backendBaseUrl+this.togglePinCodeStatusEndpoint, uploadData);
    }

    deletePinConfig(pincode){
      const httpOptions = {
        params: { pincode: pincode }
      };
      return this.http.delete(environment.backendBaseUrl+this.deletePinConfigEndpoint, httpOptions);
    }

    getAllPinsConfig(): Observable<any>{
      return this.http.get(environment.backendBaseUrl+this.getAllPinsConfigEndpoint);
    }

}
