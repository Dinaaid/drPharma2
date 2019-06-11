import { Injectable } from '@angular/core';

import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  admin: boolean = false;

  filterX: string = '';
  showX: boolean = true;
  authState: any = null;
  user: User;

  constructor( 
    public afAuth: AngularFireAuth, 
    public router: Router) { 

      this.afAuth.authState.subscribe(user => {
        if(user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          localStorage.setItem('user', null);
        }
      })
  }

  goToMedicines() {
    this.router.navigateByUrl('medicines');
  }

  goToSignIn() {
    this.router.navigateByUrl('signIn');
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        console.log(user.user.uid);
        if(user.user.uid == 'F4R5EpDvf4NFqXOiwQg6MYskiW33') {
          this.admin = true;
        } else {
          this.admin = false;
        }
        console.log(this.admin);
        this.router.navigate(['']);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  sendEmailVerification() {
   this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['']);
  }

  signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        this.sendEmailVerification();
      })
      .catch(error => {
        console.log(error);
        this.router.navigate(['']);
        throw error;
      });
  }

  sendPasswordResetEmail(passwordResetEmail: string) {
    return  this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
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
    this.router.navigate(['signIn']);
    this.authState = null;
  }
}