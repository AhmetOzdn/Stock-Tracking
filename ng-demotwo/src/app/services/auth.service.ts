import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  pipe,
  tap,
  throwError,
} from 'rxjs';
import { JwtTokenModel } from '../models/JwtTokenModel';
import { registerModel } from '../models/register.model';
import { loginModel } from '../models/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  registerUrl = 'https://localhost:7023/api/Auth/Register';
  loginUrl = 'https://localhost:7023/api/Auth/Login';
  refreshTokenUrl = 'https://localhost:7023/api/Auth/RefreshToken';
  tokenModel = new BehaviorSubject<JwtTokenModel | null>(null);
  credentials = { withCredentials: true };

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const registerObject = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    return this.http
      .post<JwtTokenModel>(this.registerUrl, registerObject, this.credentials)
      .pipe(
        tap((response) => {
          this.handleJWTToken(response.token, response.expiration);
        }),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    const loginObject = {
      email: email,
      password: password,
    };
    return this.http
      .post<JwtTokenModel>(this.loginUrl, loginObject, this.credentials)
      .pipe(
        tap((response) => {
          this.handleJWTToken(response.token, response.expiration);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let message = err.error.detail; // burada sadece error içindeki hata yazısını message içerisine atıyoruz

    // console.log(err);  tür error hatasını gösterir
    console.log(err.error.detail); // sadece error içindeki hata yazısını gösterir
    return throwError(() => message);
  }

  private handleJWTToken(token: string, expiration: Date) {
    const jwtToken = new JwtTokenModel(token, expiration);

    this.tokenModel.next(jwtToken); // burada jwtToken'ı behoviorSubject'e atıyoruz
    localStorage.setItem('token', JSON.stringify(jwtToken)); // burada localStorage'ye token'ı atıyoruz
  }

  autoLogin() {
    if (localStorage.getItem('token') == null) {
      return;
    }

    const jwtToken = JSON.parse(localStorage.getItem('token'));
    const loadedJwtToken = new JwtTokenModel(
      jwtToken.token,
      new Date(jwtToken.expiration)
    );

    this.tokenModel.next(jwtToken);
  }

  logOut() {
    this.tokenModel.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  setToken(setToken: string) {
    return localStorage.setItem('token', setToken);
  }

  removeToken() {
    return localStorage.removeItem('token');
  }

refreshToken() {
  return this.http
    .get<any>(this.refreshTokenUrl, this.credentials)
    .pipe(
      tap((response:JwtTokenModel) => {
        localStorage.setItem("token",JSON.stringify(response));
        this.tokenModel.next(response);
        console.log(response);
        debugger
      }),
      catchError(this.handleError)
    );
}



  RefreshToken() {
    return this.http.get(this.refreshTokenUrl, this.credentials).subscribe(ref=>{
     localStorage.setItem("token",JSON.stringify(ref));
    });
  }
}
