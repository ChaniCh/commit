import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { songs } from 'src/app/classes/songs';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-album-songs',
  templateUrl: './album-songs.component.html',
  styleUrls: ['./album-songs.component.scss']
})
export class AlbumSongsComponent {

  songs: Array<songs> = new Array<songs>();

  constructor(private albumsService:AlbumsService, private route:ActivatedRoute) { }

  ngOnInit() {
    const albumId = +this.route.snapshot.paramMap.get('albumId')!;
    this.albumsService.getSongs(albumId).subscribe(data => {this.songs = data}, error => {alert('error')});
  }

}
