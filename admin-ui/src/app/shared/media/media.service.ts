import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  allimagesEndPoint = "/base/homeMedia";
  updateImageEndPoint = "/secure/admin/media/updateMedia";
  addImageEndPoint = "/secure/admin/media/addMedia";
  deleteImageEndPoint = "/secure/admin/media/deleteMedia";

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<any>{
    return this.http.get(environment.backendBaseUrl+this.allimagesEndPoint);
  }

  addImage(file, isSlider, isShopNow, isContact, title, description, message): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('myFile', file);
    uploadData.append('isSlider', isSlider);
    uploadData.append('isShop', isShopNow);
    uploadData.append('isContact', isContact);
    uploadData.append('desc', description);
    uploadData.append('title', title);
    uploadData.append('message', message);
    return this.http.post(environment.backendBaseUrl+this.addImageEndPoint, uploadData);
  }

  deleteImage(imageId){
    const httpOptions = {
      params: {id: imageId}
    };
    return this.http.delete(environment.backendBaseUrl+this.deleteImageEndPoint, httpOptions);
  }

  updateImage(file, imageId ,isSlider, isShopNow, isContact, title, description, message){
    const uploadData = new FormData();
    uploadData.append('myFile', file);
    uploadData.append('id', imageId)
    uploadData.append('isSlider', isSlider);
    uploadData.append('isShop', isShopNow);
    uploadData.append('isContact', isContact);
    uploadData.append('desc', description);
    uploadData.append('title', title);
    uploadData.append('message', message);
    return this.http.put(environment.backendBaseUrl+this.updateImageEndPoint, uploadData);
  }

}
