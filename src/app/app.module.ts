import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from './services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { ServicesComponent } from './services/services.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SearchComponent } from './search/search.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { UnavailableComponent } from './unavailable/unavailable.component';
import { InformationComponent } from './information/information.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SignupComponent } from './signup/signup.component';

// export const firebaseConfig = {
//   apiKey: "AIzaSyDAUT1VrYuEpw7ZqLhDMp4lBXXX1j_NYYo",
//   authDomain: "angularfire2-8ae47.firebaseapp.com",
//   databaseURL: "https://angularfire2-8ae47.firebaseio.com",
//   projectId: "angularfire2-8ae47",
//   storageBucket: "angularfire2-8ae47.appspot.com",
//   messagingSenderId: "711574640048"
// }

export const firebaseConfig = {
  apiKey: 'AIzaSyBdlBNMD013feSxJShOYxIYI9gdZBr5nhw',
  authDomain: 'pharmacydinax.firebaseapp.com',
  databaseURL: 'https://pharmacydinax.firebaseio.com',
  projectId: 'pharmacydinax',
  storageBucket: 'pharmacydinax.appspot.com',
  messagingSenderId: '847108860094',
  appId: '1:847108860094:web:372cf199b9d3c3ff'
};

export const firebaseConfigAhmed = {
  apiKey: 'AIzaSyD74XJOJtnfp9IFfjt3o45_3yv3foV3AVE',
  authDomain: 'drfarmacy-8d74e.firebaseapp.com',
  databaseURL: 'https://drfarmacy-8d74e.firebaseio.com',
  projectId: 'drfarmacy-8d74e',
  storageBucket: 'drfarmacy-8d74e.appspot.com',
  messagingSenderId: '723386956310',
  appId: '1:723386956310:web:4cb95d24b4cb5c56'
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MedicinesComponent,
    ServicesComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    ContactUsComponent,
    SearchComponent,
    ShoppingComponent,
    UnavailableComponent,
    InformationComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ScrollToModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfigAhmed),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
