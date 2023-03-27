import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { albums } from 'src/app/classes/albums';
import { albumToSinger } from 'src/app/classes/albumToSinger';
import { users } from 'src/app/classes/users';
import { AlbumsService } from 'src/app/services/albums.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manage-albums',
  templateUrl: './manage-albums.component.html',
  styleUrls: ['./manage-albums.component.scss']
})
export class ManageAlbumsComponent {
  album: albums = new albums();
  albumToSinger: albumToSinger = new albumToSinger();
  albums: Array<albums> = new Array<albums>();
  singers: Array<users> = new Array<users>();
  albumToSingers: Array<albumToSinger> = new Array<albumToSinger>();
  registerForm: any = FormGroup;
  submitted = false;
  singerSelect = new FormControl('');
  albumSelect = new FormControl<users | undefined>(undefined);
  selectedImage!: File;

  constructor(private albumsService: AlbumsService, private usersService: UsersService, private formBuilder: FormBuilder,
    private storage: AngularFireStorage) { }

  get f() {
    return this.registerForm.controls;
  }

  // בחירת תמונה לאלבום
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // העלאת תמונה וקריה לפונקציה הוספת אלבום
  uploadImage() {
    const filePath = `image/${this.selectedImage.name}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);

    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.album.image = url;
          this.addAlbum();
          console.log('url:' , url);
        });
      })
    )
    .subscribe();
   } 

  ngOnInit() {
    this.albumsService.getAlbumToSinger().subscribe(data => { this.albumToSingers = data });
    this.albumsService.getAlbums().subscribe(data => { this.albums = data });
    this.usersService.getArtists().subscribe(data => { this.singers = data });

    this.registerForm = this.formBuilder.group({
      publicationDate: ['', [Validators.required]],
        name: ['', [Validators.required]]
    });
  }

  // ניהול אלבומים
  // הוספת אלבום
  addAlbum() {
    this.album.status = true;
    this.albumsService.addAlbum(this.album).subscribe(data => { this.albums = data }, error => { console.log('error', error) });
  }

  // הוספת אלבום לזמר
  addAlbumToSinger() {
    this.albumsService.addAlbumToSinger(this.albumToSinger).subscribe(data => {
      this.albumToSingers = data }, error => { console.log('error', error) });
  }

}
