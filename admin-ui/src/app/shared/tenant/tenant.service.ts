import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  updateTenantDetailsEndpoint = "/tenant/updateTenant";

  constructor(private http:HttpClient) { }

  updateTenantDetails(id, fileLogo, email, businessEmail, password, contact, street, city, pin, facebook, twitter, insta, gst){
    const uploadData = new FormData();
    uploadData.append('myFile', fileLogo);
    uploadData.append('tenantDetailId', id);
    uploadData.append('tenantEmail', email);
    uploadData.append('tenantStreet', street);
    uploadData.append('tenantContact', contact);
    uploadData.append('tenantCity', city);
    uploadData.append('tenantPin', pin);
    uploadData.append('tenantTwitter', twitter);
    uploadData.append('tenantFacebook', facebook);
    uploadData.append('tenantInsta', insta);
    uploadData.append('businessEmail', businessEmail);
    uploadData.append('businessEmailPassword', password);
    uploadData.append('gstIn', gst);
    return this.http.put(environment.backendBaseUrl+this.updateTenantDetailsEndpoint, uploadData);
  }
}
