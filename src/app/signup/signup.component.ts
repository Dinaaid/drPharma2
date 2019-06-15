import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  error: { name: string; message: string } = { name: '', message: '' };

  constructor(
    public authService: AuthService,
    private router: Router,
    public app: AppComponent
  ) {
    authService.showX = false;
  }

  ngOnInit() {}

  signup(userForm) {
    this.clearErrorMessage();

    console.log(userForm.value);

    this.authService
      .signUpWithEmail(userForm.value)
      .then(() => {
        this.app.db
          .object('carts')
          .update({ [this.authService.userId]: '' })
          .then(() => {
            this.app.db
              .list('users')
              .push({
                ...userForm.value,
                password: '',
                uid: this.authService.userId
              })
              .then(() => this.router.navigate(['signIn']));
          });
      })
      .catch(_error => {
        this.error = _error;
        // this.router.navigate(['/signIn']);
      });
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }
}
