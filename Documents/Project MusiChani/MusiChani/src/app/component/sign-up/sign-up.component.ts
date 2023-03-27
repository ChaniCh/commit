import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { users } from 'src/app/classes/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  user: users = new users();
  users: Array<users> = new Array<users>();
  registerForm:any = FormGroup;
  submitted = false;
  emailExists!: boolean;
  hide = true;
  selectedFile!: File;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private storage: AngularFireStorage) { }

  // בחירת תמונת פרופיל
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // העלאת תמונת פרופיל וקריאה לפונקציה הרשמה לאתר
  uploadImage() {
      const filePath = `image/${this.selectedFile.name}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);
  
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            this.user.image = url;
            this.signUp();
            console.log('url:' , url);
          });
        })
      )
      .subscribe();
     } 

  get f() {
    return this.registerForm.controls;
  }

  // הצגת המשתמשים בעת טעינה
  ngOnInit() {
    this.usersService.getUsers().subscribe(data => { this.users = data }, error => {console.log('error', error)});

    // בדיקות ולידציה
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],     //הוספת בדיקות ולידציה נוספות 
      password: ['', [Validators.required]]  //הוספת בדיקות ולידציה נוספות 
    });
  }

  // בדיקה האם אימייל קיים במערכת
  checkEmailExists() {
    const email = this.f.email.value;
    if(email) {
      this.usersService.checkEmailExists(email).subscribe(result => { this.emailExists = result; })
    }
  }

  // אפשרות לראות את הסיסמא
  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hide = !this.hide;
  }

  // הרשמה למערכת
  signUp() {
    this.submitted = true;
    if(this.registerForm.invalid || this.emailExists) {
      return;
    }
    
    this.usersService.signUp(this.user).subscribe(data => { this.users = data }, error => { console.log('error', error) });
  }

  // 

}