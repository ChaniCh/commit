import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { finalize } from 'rxjs';
import { songs } from 'src/app/classes/songs';
import { songToSinger } from 'src/app/classes/songToSinger';
import { tags } from 'src/app/classes/tags';
import { users } from 'src/app/classes/users';
import { SongsService } from 'src/app/services/songs.service';
import { TagsService } from 'src/app/services/tags.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manage-songs',
  templateUrl: './manage-songs.component.html',
  styleUrls: ['./manage-songs.component.scss']
})
export class ManageSongsComponent {
  songs: Array<songs> = new Array<songs>();
  artists: Array<users> = new Array<users>();
  tags: Array<tags> = new Array<tags>();
  songToSingers: Array<songToSinger> = new Array<songToSinger>();
  song: songs = new songs();
  user: users = new users();
  tag: tags = new tags();
  songToSinger: songToSinger = new songToSinger();
  submitted = false;
  registerForm:any = FormGroup;
  artistsSelect = new FormControl('');
  songsSelect = new FormControl<users | undefined>(undefined);
  selectedSong!: File;
  selectedImage!: File;
  ckeConfig: any;
  tagExists!: boolean;
  // editor = ClassicEditor;

  constructor(private songsService: SongsService, private storage: AngularFireStorage, private formBuilder: FormBuilder,
    private usersService: UsersService, private tagsService: TagsService) { }
    
    get f() {
      return this.registerForm.controls;
    }

  ngOnInit() {
    this.usersService.getArtists().subscribe(data => { this.artists = data });
    this.songsService.getSongs().subscribe(data => { this.songs = data });

    this.registerForm = this.formBuilder.group({
      publicationDate: ['', [Validators.required]],
      name: ['', [Validators.required]],
      tag: ['', [Validators.required]]
    });
  }

  // בחירת שיר
  onSongSelected(event: any) {
    this.selectedSong = event.target.files[0];
  }

  // בחירת תמונה
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  addSong() {
    // if(this.selectedSong && this.selectedImage) {
      // העלאת שיר
      const songFilePath = `songs/${this.selectedSong.name}`;
      const songRef = this.storage.ref(songFilePath);
      const songTask = this.storage.upload(songFilePath, this.selectedSong);

      // העלאת תמונה
      const imageFilePath = `image/${this.selectedSong.name}`;
      const imageRef = this.storage.ref(imageFilePath);
      const imageTask = this.storage.upload(imageFilePath, this.selectedImage);

      songTask.snapshotChanges().pipe(
        finalize(() => {
          songRef.getDownloadURL().subscribe(url => {
            this.song.song = url;
            // this.saveSong();
            console.log('url:' , url);
          });
        })
      ).subscribe();

      imageTask.snapshotChanges().pipe(
        finalize(() => {
          imageRef.getDownloadURL().subscribe(url => {
            this.song.image = url;
            this.saveSong();
            console.log('url:' , url);
          });
        })
      ).subscribe();
    }
  // }

  saveSong() {
    // this.submitted = true;
    // if(this.registerForm.invalid) {
    //   return;
    // }

    this.song.status = true;
    this.songsService.addSong(this.song).subscribe(data => { this.songs = data }, error => { console.log('error', error) });
  }

    // הוספת זמר לשיר
    addSongToSinger() {
      this.songsService.addSongToSinger(this.songToSinger).subscribe(data => {
        this.songToSingers = data }, error => { console.log('error', error) });
    }
    
    // מחיקת שיר
    deleteSong(songId: number) {
      this.songsService.deleteSong(songId).subscribe(data => { this.songs = data }, error => { console.log('error', error) });
    }

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
