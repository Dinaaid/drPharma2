import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  admin: boolean = false;

  filterX: string = '';
  showX: boolean = true;
  authState: any = null;
  user: User;
  userId: string = '';

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  goToMedicines() {
    this.router.navigateByUrl('medicines');
  }

  goToSignIn() {
    this.router.navigateByUrl('signIn');
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        this.userId = user.user.uid;
        localStorage.setItem('userId', user.user.uid);
        // if (user.user.uid === 'tFgM2ZBjHIf8iW7maR6K3XcPzzZ2')
        if (user.user.uid === 'teeitjhvuHhfGUzYjNYxxYb6mGf2') {
          this.admin = true;
        } else {
          this.admin = false;
        }
        this.router.navigate(['']);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  sendEmailVerification() {
    this.afAuth.auth.currentUser.sendEmailVerification();
    // this.router.navigate(['']);
  }

  signUpWithEmail(userData) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(user => {
        console.log('u', user);
        this.authState = user;
        this.userId = user.user.uid;
        this.sendEmailVerification();
      })
      .catch(error => {
        console.log(error);
        // this.router.navigate(['']);
        throw error;
      });
  }

  sendPasswordResetEmail(passwordResetEmail: string) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(reset => {
        this.router.navigate(['']);
      })
      .catch(error => {
        console.log(error);
        this.router.navigate(['']);
        throw error;
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['']);
    this.authState = this.afAuth.user;
  }

  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    this.router.navigate(['']);
    this.authState = this.afAuth.user;
  }

  signOut() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    this.router.navigate(['signIn']);
    this.authState = null;
    this.userId = null;
  }
}
