import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { followListeningSongs } from 'src/app/classes/followListeningSongs';
import { songs } from 'src/app/classes/songs';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-song-plays',
  templateUrl: './song-plays.component.html',
  styleUrls: ['./song-plays.component.scss']
})
export class SongPlaysComponent {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioPlayer') audioPlayer: any ;
  songs: Array<songs> = new Array<songs>();
  song: songs = new songs();
  follower: followListeningSongs = new followListeningSongs();
  followers: Array<followListeningSongs> = new Array<followListeningSongs>();

  constructor(private songsService: SongsService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    const songId = +this.route.snapshot.paramMap.get('songId')!;
    this.songsService.getSongById(songId).subscribe(data => { this.song = data }, error => { console.log('error', error) });
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

   // עצירת שיר
   stopMusic() {
    this.audioPlayer.nativeElement.pause();
  }

  // מעבר לשיר
  beyondTheSongPlaysPage(songId: number | undefined) {
    this.router.navigate(['songPlays', songId]);
  }

}
