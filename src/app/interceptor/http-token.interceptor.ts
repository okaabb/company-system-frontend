import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.authService.isLoggedIn())
    if (request.url.includes("/login")) {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/home']);
        return new Observable<HttpEvent<unknown>>();
      }
      return next.handle(request);
    }
    const token = localStorage.getItem('token') as string;
    if (token) {
      const authReq = request.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      });
      return next.handle(authReq);
    }
    this.router.navigate(['/home']);
    return new Observable<HttpEvent<any>>();
  }
}
