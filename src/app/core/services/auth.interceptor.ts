import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem("token");
    const tokenType = 'Bearer';

    if (!token) return next.handle(request);

    request = request.clone({
      headers: request.headers.set('authorization', `${tokenType} ${token}`),
    });

    return next.handle(request);
  }
}
