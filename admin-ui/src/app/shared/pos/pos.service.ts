import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  createPOSEndpoint = "/secure/admin/pos/createPOS";
  getPOSdataEndpoint = "/secure/admin/pos/getPOS";
  viewPDFEndpoint = "/secure/admin/pos/viewPdf";
  viewPDFDocumentEndpoint = "/secure/admin/pos/viewPdfInvoice";
  getPosbyIdEndpoint = "/secure/admin/pos/getPOSById";
  updatePOSEndpoint = "/secure/admin/pos/updatePOS";
  deleteItemPOSEndpoint = "/secure/admin/pos/removeItem";

  constructor(private http: HttpClient){}

  createPOS(totalQty, mobile, payment, subTotal, actualSubTotal, totalDiscount, products): Observable<any>{
    const body = {
      timeCreated: new Date().getTime(),
      mobile: mobile,
      paymentMode: payment,
      subTotal: subTotal,
      actualSubTotal: actualSubTotal,
      totalQuantity: totalQty,
      posProduct: products,
      moneySaved: totalDiscount
     };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.backendBaseUrl+this.createPOSEndpoint, body, httpOptions);
   }

   updatePOS(posId, totalQty, mobile, payment, subTotal, actualSubTotal, totalDiscount, products): Observable<any>{
    const body = {
      timeCreated: new Date().getTime(),
      mobile: mobile,
      paymentMode: payment,
      subTotal: subTotal,
      actualSubTotal: actualSubTotal,
      totalQuantity: totalQty,
      posProduct: products,
      moneySaved: totalDiscount
     };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: {
        posId: posId
      }
    };
    return this.http.post(environment.backendBaseUrl+this.updatePOSEndpoint, body, httpOptions);
   }

   getPOSDataById(posId){
    const httpOptions = {
      params: {
        posId: posId
      }
    }
    return this.http.get(environment.backendBaseUrl+this.getPosbyIdEndpoint, httpOptions);
   }

   deleteItem(posId, itemId){
    const httpOptions = {
      params: {
        posId: posId,
        itemId: itemId
      }
    }
    return this.http.delete(environment.backendBaseUrl+this.deleteItemPOSEndpoint, httpOptions);
   }

   getPOSData(limit, offset, dateCondition, date){
    let requestHeaders = new HttpHeaders().set('Content-Type', 'application/json')
                                          .append('Offset', offset)
                                          .append('Limit', limit);
    const httpOptions = {
      headers: requestHeaders,
      params: {
        filterCondition: dateCondition,
        filterDate: date
      }
    }
    return this.http.get(environment.backendBaseUrl+this.getPOSdataEndpoint, httpOptions);
   }

   getPDF(posId){
    const options = { responseType: Blob  };
    return this.http.get<any>(environment.backendBaseUrl+this.viewPDFEndpoint, { responseType: 'arraybuffer' as 'json', params : {id : posId} });
   }

   getPDFDocument(posId){
    const options = { responseType: Blob  };
    return this.http.get<any>(environment.backendBaseUrl+this.viewPDFDocumentEndpoint, { responseType: 'arraybuffer' as 'json', params : {id : posId} });
   }

}
