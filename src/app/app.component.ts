import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
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
  newMedicineImageFIle: string = '';
  newMedicineQuantity: number;
  editMedicineX: boolean = false;
  editId: number;
  isUpload: boolean = true;

  constructor(
    public authService: AuthService,
    public db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private router: Router) {
    this.medicineRef = db.list('/medicines');
    this.cartRef = db.list('/cart');
    this.loadMembers(false);
  }

  // private basePath:string = '/medicines';
  // uploads:any;

  // private pushUpload(upload: any) {
  //   let storageRef = firebase.storage().ref();
  //   let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //     (snapshot) =>  {
  //       // upload in progress
  //       // upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     },
  //     (error) => {
  //       // upload failed
  //       console.log(error)
  //     },
  //     () => {
  //       // upload success
  //       upload.url = uploadTask.snapshot.downloadURL
  //       upload.name = upload.file.name
  //       this.saveFileData(upload)
  //     }
  //   );
  // }

  // uploadSingle(file) {
  // // let file = this.newMedicineImageFIle[0]
  // console.log(file);
  //   this.pushUpload(file[0])
  // }

  // Writes the file details to the realtime db
  // private saveFileData(upload: any) {
  //   this.db.list(`${this.basePath}/`).push(upload);
  // }

  uploadFile(event, filePath) {
    this.isUpload = false;
    console.log('eve', event);
    const file = event.target.files[0];
    if (!file) {
      return this.isUpload = true;
    };
    const task = this.storage.upload(`${filePath}/${file.name}`, file).then(resp => {
      this.storage.ref(resp.metadata.fullPath).getDownloadURL().subscribe(
        url => {
          this.newMedicineImageFIle = url;this.isUpload = true;
        }
      )
      
    })
  }

  addMember(newName: string, newDesc: string, newQuantity: number) {
    this.medicineRef.push({
      text: newName,
      desc: "price : " + newDesc + " LE ",
      quantity: "Quantity : " + newQuantity,
      imageUrl: this.newMedicineImageFIle
    });
    this.newMedicineX = '';
    this.newMedicineDesc = '';
    this.newMedicineImageFIle = '';
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
      this.medicineRef.remove(key),
      this.cartRef.remove(key);
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