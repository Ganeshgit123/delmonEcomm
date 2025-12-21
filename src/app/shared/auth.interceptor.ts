import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let authReq = req;
    const token = this.authService.getToken();
    const langkey = this.authService.getLanguage();
    const webflow = this.authService.getWebFlow();
    if (token) {
      authReq = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'language': `${langkey}`,
          'type': `${webflow}`,
        },
      });
    } else {
      authReq = req.clone({
        setHeaders: {
          'language': `${langkey}`,
          'type': `${webflow}`,
        },
      });
    }
    // console.log("auth",authReq)
    return next.handle(authReq);
  }


}
