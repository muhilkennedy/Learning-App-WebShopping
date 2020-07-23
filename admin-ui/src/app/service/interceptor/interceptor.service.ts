import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpResponse, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserStoreService } from '../userStore/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private userStore: UserStoreService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newHeaders = req.headers;
      // Append tenant-Id to all outgoing requests.
      if (environment.tenantId) {
         newHeaders = newHeaders.append('Tenant-Id', environment.tenantId);
      }
      // Add Authorization token if present.
      if(this.userStore!=undefined && this.userStore.JwtToken){
        newHeaders = newHeaders.append('Authorization', `Bearer ${this.userStore.JwtToken}`);
      }
      const authReq = req.clone({headers: newHeaders});
      return next.handle(authReq);
      // return next.handle(authReq).pipe(
      //   // Do custom work here
      // );
  }



}
