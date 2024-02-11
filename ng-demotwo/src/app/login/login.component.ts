import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginFormControl(login: NgForm) {
    if (login.invalid) {
      return;
    } else {
      const email = login.value.email;
      const password = login.value.password;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.error = '';
        },
        error: (err) => {
          this.error = err;
          console.log(err);
          
        },
      });
    }
  }
}
