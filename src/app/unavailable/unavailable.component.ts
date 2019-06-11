import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

import { AppComponent } from "../app.component";

@Component({
  selector: 'app-unavailable',
  templateUrl: './unavailable.component.html',
  styleUrls: ['./unavailable.component.scss']
})
export class UnavailableComponent implements OnInit {

  // @ViewChild('updateText') updateText: ElementRef;

  constructor(
    public app: AppComponent,
    public authService: AuthService) {
      authService.showX = true;
  }

  ngOnInit() {
  }

  // editMember(i) {
  //   this.app.editMedicineX = true;
  //   this.app.editId = i;
  //   setTimeout(() => this.updateText.nativeElement.focus());
  // }

}