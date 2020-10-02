import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import has = Reflect.has;
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   private_key = 'aa0cd20adc39f017eacbee8fb82647c171a84747';
   public_key = '677b9e6da30aa70f2d17353794b82de4';
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth')) {
      return next.handle(req);
    }
    const md5 = new Md5();
    const time = new Date().getTime();
    md5.appendStr('' + time);
    md5.appendStr(this.private_key);
    md5.appendStr(this.public_key);
    const hash = md5.end();

    let headers = req.headers;
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    let  params = req.params;
    params = params.append('hash', '' + hash);
    params = params.append('apikey', this.public_key);
    params = params.append('ts', '' + time);

    const newReq = req.clone({params, headers});
    console.log('en el interceptor ', newReq.urlWithParams);
    return next.handle(newReq);
  }
}
