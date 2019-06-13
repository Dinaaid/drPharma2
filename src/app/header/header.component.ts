import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { PharmacyService } from "../services/pharmacy.service";
import { AuthService } from "../services/auth.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public app: AppComponent,
    public pharmacyService: PharmacyService,
    private translate: TranslateService
    ) {
  }

  ngOnInit() {
  }

  switchLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
  }

}
