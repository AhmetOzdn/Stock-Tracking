import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn:"root"
})
export class AdminGuard implements CanActivate{
    constructor(private authService:AuthService , private router:Router){

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            
            return this.authService.tokenModel.pipe(
                map(behaviorSubject =>{
                     return !!behaviorSubject // && user.email == "email girilecek" e-mail. ile girilen kişinin admin mi olduğunu sorgularız
                }),
                tap(isAdmin =>{
                    if(!isAdmin){
                        this.router.navigate(["/register"]);
                        localStorage.removeItem("token");
                        
                    }
                })
            );
         }

}