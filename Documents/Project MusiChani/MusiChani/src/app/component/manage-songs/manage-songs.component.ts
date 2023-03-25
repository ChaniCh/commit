import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { songs } from 'src/app/classes/songs';
import { songToSinger } from 'src/app/classes/songToSinger';
import { users } from 'src/app/classes/users';
import { SongsService } from 'src/app/services/songs.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manage-songs',
  templateUrl: './manage-songs.component.html',
  styleUrls: ['./manage-songs.component.scss']
})
export class ManageSongsComponent {
  songs: Array<songs> = new Array<songs>();
  artists: Array<users> = new Array<users>();
  songToSingers: Array<songToSinger> = new Array<songToSinger>();
  song: songs = new songs();
  user: users = new users();
  songToSinger: songToSinger = new songToSinger();
  submitted = false;
  registerForm:any = FormGroup;
  artistsSelect = new FormControl('');
  songsSelect = new FormControl<users | undefined>(undefined);
  // selectedSinger = null;

  constructor(private songsService: SongsService, private storage: AngularFireStorage, private formBuilder: FormBuilder,
    private usersService: UsersService) { }

  get f() {
    return this.registerForm.controls;
  }

  // onSubmit() {
  //   this.submitted = true;
  //   this.saveSong(this.song);
  //   this.song = new songs(); // Reset the form
    // this.selectedSinger = null;
  // }

  ngOnInit() {
    this.songsService.getSongToSinger().subscribe(data => { this.songToSingers = data }, error => { console.log('error:', error)});
    this.usersService.getArtists().subscribe(data => { this.artists = data });
    this.songsService.getSongs().subscribe(data => { this.songs = data });

    this.registerForm = this.formBuilder.group({
      publicationDate: ['', [Validators.required]],
      name: ['', [Validators.required]],
      tag: ['', [Validators.required]]
    });
  }

  // הוספת שיר
  // addSong() {
  //   this.song.status = true;
  //   this.songsService.addSong(this.song).subscribe(data => { this.songs = data }, error => { alert('error') });
  // }

  // saveSong(song: songs) {
  //   this.song.status = true;
  //   this.songsService.addSong(song).subscribe(data => {
  //     this.songToSinger.singerId = 31;
  //     this.songToSinger.songId = 1;
  //     this.songsService.addSongToSinger(this.songToSinger).subscribe(data => { this.songToSingers = data }, error => { console.log('error')});
  //   })
  // }

  // העלאת שיר
  // uploadSong(event: any) {
  //   const file = event.target.files[0];
  //     const filePath = `songs/${file.name}`;
  //     const ref = this.storage.ref(filePath);
  //     const task = ref.put(file);

  //     task.snapshotChanges().pipe(
  //       finalize(() => {
  //         ref.getDownloadURL().subscribe(url => {
  //           this.song.fileLocation = url;
  //           // this.songsService.addSong(this.song).subscribe(data => { this.songs = data }, error => { console.log('error', error) });
  //           console.log('url:' , url);
  //         });
  //       })
  //     )
  //     .subscribe();
  //   } 

  // הוספת זמר לשיר
  addSongToSinger() {
    // this.songToSinger.songId = this.song.id // (this.songsSelect.value as songs).id?[0]:0;
    // this.songToSinger.singerId = this.user.id //(this.artistsSelect.value as users).id?[0]:0;
    console.log('songId' + this.songToSinger.songId);
    console.log('singerId' + this.songToSinger.singerId);
    this.songsService.addSongToSinger(this.songToSinger).subscribe(data => { this.songToSingers = data }, error => { console.log('error', error) });
  }

  // מחיקת שיר
}
