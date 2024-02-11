import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  error: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  registerFormControl(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    } else {
      const email = registerForm.value.email;
      const password = registerForm.value.password;
      const firstName = registerForm.value.firstName;
      const lastName = registerForm.value.lastName;

      this.authService
        .register(firstName, lastName, password, email)
        .subscribe({
          next: (result) => {
            console.log(result);
            this.router.navigate(['/login']);
          },

          error: (err) => {
            this.error = err;
            console.log(err);
          },
        });
    }
  }
}
