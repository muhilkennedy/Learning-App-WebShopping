import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newHeaders = req.headers;
      // Append tenant-Id to all outgoing requests.
      if (environment.tenantId) {
         newHeaders = newHeaders.append('Tenant-Id', environment.tenantId);
         newHeaders = newHeaders.append('Request-Origin', environment.BuildOrigin);
      }
      const authReq = req.clone({headers: newHeaders});
      return next.handle(authReq);
      // return next.handle(authReq).pipe(
      //   // Do custom work here
      // );
  }
}
