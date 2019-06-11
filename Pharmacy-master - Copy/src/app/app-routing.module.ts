import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { ServicesComponent } from './services/services.component';
import { SigninComponent } from './signin/signin.component';
import { ContactUsComponent  } from './contact-us/contact-us.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'signIn', component: SigninComponent },
  { path: 'medicines', component: MedicinesComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'shopping', component: ShoppingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
