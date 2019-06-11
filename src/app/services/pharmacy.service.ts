import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(
    private _scrollToService: ScrollToService,
    private router: Router) { }

  public triggerScrollTo() {
    
    const config: ScrollToConfigOptions = {
      target: 'ourServices'
    };

    this.router.navigateByUrl('');
    setTimeout( () =>  this._scrollToService.scrollTo(config));
  }
}
