import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

import { AppComponent } from "../app.component";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  

  constructor(
    public app: AppComponent,
    public authService: AuthService) { 
      authService.showX = true;
  }

  ngOnInit() {
  }


}
