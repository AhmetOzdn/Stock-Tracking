import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false; // bu bize kişilerin giriş yapmışmı yapmamış mı sorgusunu döndürmemizi sağlayacak

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.tokenModel.subscribe((response) => {
      this.isAuthenticated = !!response;
    });
  }

  logOut(){
    this.authService.logOut();
  }

  // refreshToken(){
  //   this.authService.RefreshToken()
  // }

 
  
}
