import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpResponse, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserStoreService } from '../userStore/user-store.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private userStore: UserStoreService, private cookieService: CookieService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newHeaders = req.headers;
      // Append tenant-Id to all outgoing requests.
      if (environment.tenantId) {
         newHeaders = newHeaders.append('Tenant-Id', environment.tenantId);
         newHeaders = newHeaders.append('Request-Origin', environment.BuildOrigin);
         newHeaders = newHeaders.append('Request-From', environment.origin);
      }
      // Add Authorization token if present.
      if(this.userStore!=undefined && this.userStore.JwtToken){
        newHeaders = newHeaders.append('Authorization', `Bearer ${this.userStore.JwtToken}`);
      }
      else if(this.cookieService.get('JWT') != null){
        newHeaders = newHeaders.append('Authorization', `Bearer ${this.cookieService.get('JWT')}`);
      }
      const authReq = req.clone({headers: newHeaders});
      return next.handle(authReq);
      // return next.handle(authReq).pipe(
      //   // Do custom work here
      // );
  }



}
