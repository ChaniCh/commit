import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { jobs } from 'src/app/classes/jobs';
import { jobToUser } from 'src/app/classes/jobToUser';
import { requests } from 'src/app/classes/requests';
import { users } from 'src/app/classes/users';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { UsersTableComponent } from '../users-table/users-table.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  job: jobs = new jobs();
  user: users = new users();
  request: requests = new requests();
  users: Array<users> = new Array<users>();
  jobToUser: jobToUser = new jobToUser();
  jobsToUsers: Array<jobToUser> = new Array<jobToUser>();
  jobs: Array<jobs> = new Array<jobs>();
  requests: Array<requests> = new Array<requests>();
  registerForm:any = FormGroup;
  submitted = false;
  usersSelect = new FormControl('');
  jobsSelect = new FormControl('');
  isTableOpen = false;
  selectedFile!: File;
  requestStatus = false;

  constructor(private usersService: UsersService, private jobsService: JobsService, private formBuilder: FormBuilder, 
    private dialog: MatDialog, private storage: AngularFireStorage) { }

  ngOnInit() {
    // הצגת התפקידים
    this.jobsService.getJobs().subscribe(data => { this.jobs = data }, error => {console.log('error', error)});
    // הצגת בקשות זמרים
    this.usersService.getRequests().subscribe(data => { this.requests = data }, error => {console.log('error', error)});
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      tag: ['', [Validators.required]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  // ניהול תפקידים
  // הוספת תפקיד
  addJob() {
    this.jobsService.addJob(this.job).subscribe(data => { this.jobs = data }, error => console.log('error', error));
  }

  // הוספת תפקיד למשתמש
  addJobToUser() {
    this.jobsService.addJobToUser(this.jobToUser).subscribe(data => { this.jobsToUsers = data }, error => console.log('error', error));
  }
  
openUserTableDialog(): void {
  const dialogRef = this.dialog.open(UsersTableComponent, {
    width: '600px',
    height: '400px'
  });
}

  // close() {
  //   this.dialogRef.close();
  // }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // העלאת תמונה וקריאה לפונקציה הוספת זמר
  uploadImage() {
    const filePath = `image/${this.selectedFile.name}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);

    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.user.image = url;
          this.addArtist();
          console.log('url:' , url);
        });
      })
    )
    .subscribe();
   } 

  // הוספת זמר
  addArtist() {
    this.user.status = true;
    this.usersService.addArtist(this.user).subscribe(data => { this.users = data }, error => console.log('error', error));
  }

  // עדכון סטטוס לבקשה
  updateStatusRequest(requestId: number) {
    this.usersService.updateStatusRequest(requestId).subscribe(data => { this.requests = data }, error => console.log('error', error));
  }
}
