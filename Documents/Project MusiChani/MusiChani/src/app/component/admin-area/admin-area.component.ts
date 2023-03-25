import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SongsService } from 'src/app/services/songs.service';
import { finalize } from 'rxjs';
import { songs } from 'src/app/classes/songs';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { users } from 'src/app/classes/users';
import { requests } from 'src/app/classes/requests';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TagsService } from 'src/app/services/tags.service';
import { tags } from 'src/app/classes/tags';
import { AlbumsService } from 'src/app/services/albums.service';
import { albums } from 'src/app/classes/albums';


@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.scss']
})
export class AdminAreaComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  albums: Array<albums> = new Array<albums>();
  songs: Array<songs> = new Array<songs>();
  users: Array<users> = new Array<users>();
  artists: Array<users> = new Array<users>();
  requests: Array<requests> = new Array<requests>();
  tags: Array<tags> = new Array<tags>();
  album: albums = new albums();
  song: songs = new songs();
  user: users = new users();
  tag: tags = new tags();
  file!: File;
  submitted = false;
  tagExists!: boolean;
  dataSource = this.users;
  registerForm:any = FormGroup;

  constructor(private songsService:SongsService, private storage: AngularFireStorage, private route: ActivatedRoute,
    private usersService: UsersService, private tagsService: TagsService, private formBuilder: FormBuilder, 
    private albumsService: AlbumsService) { }

    get f() {
      return this.registerForm.controls;
    }

    ngOnInit() {
      this.getUsers();

      this.registerForm = this.formBuilder.group({
        publicationDate: ['', [Validators.required]],
        name: ['', [Validators.required]],
        tag: ['', [Validators.required]]
      });
    }

    // משתמשים
    // הצגת משתמשים
    getUsers() {
      this.usersService.getUsers().subscribe(data => { this.users = data }, error => { console.log('error', error) });
    }

    // מספר משתמשים 
    getNumberOfUsers(number: number) {
      this.usersService.getNumberOfUsers().subscribe(data => { number = data }, error => { console.log('error', error) })};

    // מחיקת משתמש
    deleteUser(userId: number) {
      this.usersService.deleteUser(userId).subscribe(data => { this.users = data }, error => { console.log('error', error) });
    }

    // עדכון משתמש
    updateUser(userId: number, user: users) {
      this.usersService.updateUser(userId, user).subscribe(data => { this.requests = data }, error => { console.log('error', error) });
    }

    // זמרים
    // הצגת זמרים
    getArtists() {
      this.usersService.getArtists().subscribe(data => { this.artists = data }, error => { console.log('error', error) });
    }

    // מחיקת בקשה לזמר
    deleteRequest(id: number) {
      this.usersService.deleteRequest(id).subscribe(data => { this.requests = data }, error => { console.log('error', error) });
    }

    // אלבומים
    // הוספת אלבום
    addAlbum() {
      this.album.status = true;
      this.albumsService.addAlbum(this.album).subscribe(data => { this.albums = data }, error => { console.log('error', error) });
    }

    onFileSelected(event: any) {
      this.file = event.target.files[0];
    }

    // העלאת שיר 
    uploadSong(event: any) {
      const file = event.target.files[0];
        const filePath = `songs/${file.name}`;
        const ref = this.storage.ref(filePath);
        const task = ref.put(file);
  
        task.snapshotChanges().pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(url => {
              this.song.fileLocation = url;
              this.songsService.addSong(this.song).subscribe(data => { this.songs = data }, error => { console.log('error', error) });
              console.log('url:' , url);
            });
          })
        )
        .subscribe();
      } 

    // הוספת שיר
    addSong() {
      console.log(this.song)
      this.song.status = true;
      this.songsService.addSong(this.song).subscribe(data => { this.songs = data }, error => { alert('error') });
    }

    // תגיות
    // בדיקה האם תגית קיימת במערכת
    checkTagExists() {
      const tag = this.f.tag.value;
      if(tag) {
        this.tagsService.checkTagExists(tag).subscribe(result => { this.tagExists = result; }, error => { console.log('error', error) });
      }
    }

    // הוספת תגית
    addTag() {
      this.submitted = true;
      if(this.registerForm.invalid || this.tagExists) {
        return;
      }
      this.tag.status = true;
      this.tagsService.addTag(this.tag).subscribe(data => { this.tags = data }, error => { alert('error') });
    }

}





