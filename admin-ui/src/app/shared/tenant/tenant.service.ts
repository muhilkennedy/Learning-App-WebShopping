import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  updateTenantDetailsEndpoint = "/secure/admin/tenant/updateTenant";
  updateTenantDetailFssaiEndpoint = "/secure/admin/tenant/updateTenantFssai";
  updateTenantDetailTagLineEndpoint = "/secure/admin/tenant/updateTagLine";
  updateTenantLocationEndpoint = "/secure/admin/tenant/updateMapLocation";

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

  updateFssai(fssai){
    const uploadData = new FormData();
    uploadData.append('fssai', fssai);
    return this.http.put(environment.backendBaseUrl+this.updateTenantDetailFssaiEndpoint, uploadData);
  }

  updateTagLine(tag){
    const uploadData = new FormData();
    uploadData.append('tagLine', tag);
    return this.http.put(environment.backendBaseUrl+this.updateTenantDetailTagLineEndpoint, uploadData);
  }

  updateTenantLocation(location){
    const uploadData = new FormData();
    uploadData.append('location', location);
    return this.http.put(environment.backendBaseUrl+this.updateTenantLocationEndpoint, uploadData);
  }

}
