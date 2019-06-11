import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from "./services/auth.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  medicineRef: AngularFireList<any>;
  cartRef: AngularFireList<any>;
  medicines$: Observable<any[]>;
  cart$: Observable<any[]>;

  newMedicineX: string = '';
  newMedicineDesc: string = '';
  newMedicineQuantity: number;
  editMedicineX: boolean = false;
  editId: number;

  constructor(
    public authService: AuthService,
    public db: AngularFireDatabase,
    private router: Router) {
    this.medicineRef = db.list('/medicines');
    this.cartRef = db.list('/cart');
    this.loadMembers(false);
  }

  addMember(newName: string, newDesc: string, newQuantity: number) {
    this.medicineRef.push({
      text: newName,
      desc: newDesc,
      quantity: newQuantity
    });
    this.newMedicineX = '';
    this.newMedicineDesc = '';
    this.newMedicineQuantity = 0;
  }

  addToCart(medicine: object) {
    this.cartRef.push(medicine);
  }

  // editMember(i) {
  //   this.editMedicineX = true;
  //   this.editId = i;
  //   setTimeout( () => this.updateText.nativeElement.focus());
  // }

  updateMember(key: string, newText: string, newDesc: string) {
    this.medicineRef.update(key, {
      text: newText,
      desc: newDesc
    });
    this.editMedicineX = false;
  }

  deleteMember(key: string) {
    if (confirm('R u sure u wanna delete this?!'))
      this.medicineRef.remove(key);
  }

  loadMembers(filterX) {
    // Use snapshotChanges().map() to store the key
    this.medicines$ = this.medicineRef.snapshotChanges().pipe(
      map(changes => {
        //filter Members X-Team 
        changes = (filterX) ?
          changes.filter(changes => changes.payload.val().text.toLowerCase().includes(filterX.toLowerCase())) :
          changes;
        // Sort Alphabetical X-Team
        changes = changes.sort((a, b) => a.payload.val().text.toLowerCase() < b.payload.val().text.toLowerCase() ? -1 : 1);
        // key and value X-Team
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );

    // Use snapshotChanges().map() to store the key
    this.cart$ = this.cartRef.snapshotChanges().pipe(
      map(changes => {
        // key and value X-Team
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  filterGlobal(filterX) {
    this.router.navigate(['medicines']);
    this.loadMembers(filterX);
  }

  searchGlobal(filterX) {
    this.router.navigate(['medicines']);
    this.loadMembers(filterX);
    this.authService.filterX = '';
  }
}