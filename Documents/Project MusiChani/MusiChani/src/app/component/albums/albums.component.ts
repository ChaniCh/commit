import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { albums } from 'src/app/classes/albums';
import { users } from 'src/app/classes/users';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
  @Input() singerId!: number;

  albums: Array<albums> = new Array<albums>();

  constructor(private albumsService:AlbumsService, private router:Router) {  }

  ngOnInit() {
    this.albumsService.getAlbums().subscribe(data => {this.albums = data}, error => {alert('error')});
  }

  getSongs(albumId: number) {
    this.router.navigate(['albumSongs', albumId]);
  }
}
