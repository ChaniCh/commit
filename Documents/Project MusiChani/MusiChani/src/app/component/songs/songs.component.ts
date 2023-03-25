import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { favoriteSongs } from 'src/app/classes/favoriteSongs';
import { followListeningSongs } from 'src/app/classes/followListeningSongs';
import { playlist } from 'src/app/classes/playlist';
import { songs } from 'src/app/classes/songs';
import { PlaylistService } from 'src/app/services/playlist.service';
import { SongsService } from 'src/app/services/songs.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioPlayer') audioPlayer: any ;
  favoriteSongs: Array<favoriteSongs> = new Array<favoriteSongs>();
  playlists: Array<playlist> = new Array<playlist>();
  songs: Array<songs> = new Array<songs>();
  favoriteSong: favoriteSongs = new favoriteSongs();
  song: songs = new songs();
  follower: followListeningSongs = new followListeningSongs();
  followers: Array<followListeningSongs> = new Array<followListeningSongs>();
  isFavorite = false;

  constructor(private songsService:SongsService, private usersService: UsersService, private playlistService: PlaylistService) { }

  ngOnInit() {
    this.songsService.getSongs().subscribe(songs => { this.songs = songs }, error => { alert('error') });
  }

  // שמיעת שיר והוספת מעקב שיר
  playSong(songId: number):void {
    this.songsService.getSongUrl(songId).subscribe(url => { this.audioPlayer.nativeElement.src = url;
      console.log(url)
    this.audioPlayer.nativeElement.play(); }, error => { alert('error') });
    this.follower.userId = 1;
    this.follower.songId = songId;
    this.songsService.addFollower(this.follower).subscribe(data => { this.followers = data }, error => { console.log('error', error) });
  }

  // הוספת שיר למועדפים
  addFavoriteSong() {
    this.favoriteSong.userId = 1;
    this.favoriteSong.songId = 12;
    console.log('songId', this.favoriteSong.songId);
    this.songsService.addFavoriteSong(this.favoriteSong).subscribe(data => { this.favoriteSongs = data }, error => { console.log('error', error) });
  }

  // עצירת שיר
  stopMusic() {
    this.audioPlayer.nativeElement.pause();
  }

}
