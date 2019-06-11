import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor( 
    public app: AppComponent, 
    public authService: AuthService) {

   }

  ngOnInit() {
  }

}
