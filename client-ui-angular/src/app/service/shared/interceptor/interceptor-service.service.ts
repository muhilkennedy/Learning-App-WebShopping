import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStoreService } from '../user-store/user-store.service';

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
      else if(this.cookieService.get('CLIENTJWT') != null){
        newHeaders = newHeaders.append('Authorization', `Bearer ${this.cookieService.get('CLIENTJWT')}`);
      }
      const authReq = req.clone({headers: newHeaders});
      return next.handle(authReq);
    }
}
