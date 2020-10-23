import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  createTemplateEndpoint = "/secure/admin/template/createTemplate";
  getTemplatePDFEndpoint = "/secure/admin/template/getActiveTemplate";
  getTemplateDocumentEndpoint = "/secure/admin/template/downloadActiveTemplate";

  constructor(private http: HttpClient) { }

  uploadTemplate(file){
    const uploadData = new FormData();
    uploadData.append('myFile', file);
    return this.http.post(environment.backendBaseUrl+this.createTemplateEndpoint, uploadData);
  }

  getTemplate(){
    return this.http.get<any>(environment.backendBaseUrl+this.getTemplatePDFEndpoint, { responseType: 'arraybuffer' as 'json' });
  }

  getTemplateDocument(){
    return this.http.get<any>(environment.backendBaseUrl+this.getTemplateDocumentEndpoint, { responseType: 'arraybuffer' as 'json' });
  }

}
