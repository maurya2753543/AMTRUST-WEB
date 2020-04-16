import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let lastActivityTime = parseInt(localStorage.getItem('lastActivityTime'));
    let currentTime = new Date().getTime();
    let timeDifference = (currentTime - lastActivityTime) / 1000;
    if (timeDifference > 900) {
      let countryId = localStorage.getItem("countryId")
      let countryName;
      if (countryId == "1") {
        countryName = "ind"
      }
      else if(countryId == "2") {
        countryName = "idn"
      }
      else if(countryId == "3"){
        countryName = "ph"
      }
      
      localStorage.clear();
      let url = window.location.origin + '/#/login/' + countryName;
      window.location.href = url;
    }
    else{
      let time = new Date().getTime().toString();
      localStorage.setItem('lastActivityTime', time);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
      return next.handle(request);
    }  
  }
}