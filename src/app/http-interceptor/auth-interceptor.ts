import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const authToken = localStorage.getItem('auth-token');

        // stop if authToken is null
        if (!authToken) {
            return next.handle(req);
        }

        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });

        return next.handle(authReq);

    }

}