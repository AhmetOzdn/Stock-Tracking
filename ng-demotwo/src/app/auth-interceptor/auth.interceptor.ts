import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment'; // moment modülünü içe aktarın

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    let JWTToken = this.authService.tokenModel.value;
    const updatedMoment = moment();
    
   
    
    //Loglamalar
    console.log(JWTToken);
    console.log('ınterceptor çalıştı');
    //Loglamalar Bitiş


    if (JWTToken == null){
      return next.handle(request)
    }

    const expirationDate = moment(JWTToken.expiration); 
    if ( expirationDate < updatedMoment) { // Moment nesnesi olarak karşılaştırma yapın
      this.authService.refreshToken().pipe(
        switchMap((token:any) => {
          this.authService.tokenModel.next(token)
          const tokenReq = request.clone({
            setHeaders: {
              Authorizaton: `Bearer ${JWTToken.token}`,
            },
          });
          return next.handle(tokenReq)
        })
      )
      console.log("Token süresi yenilendi");
      debugger
    }

        const tokenReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JWTToken.token}`,
        },
      });
      return next.handle(tokenReq);
    }
} 

