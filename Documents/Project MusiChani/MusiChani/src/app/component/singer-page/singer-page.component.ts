import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { albums } from 'src/app/classes/albums';
import { users } from 'src/app/classes/users';
import { AlbumsService } from 'src/app/services/albums.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-singer-page',
  templateUrl: './singer-page.component.html',
  styleUrls: ['./singer-page.component.scss']
})
export class SingerPageComponent {
  albums: Array<albums> = new Array<albums>();
  // album: albums = new albums();
  // singer: users = new users();
  singerId = 30;

  constructor(private albumsService: AlbumsService, private route: ActivatedRoute, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    // const singerId = +this.route.snapshot.paramMap.get('singerId')!;
    // this.albumsService.getAlbumsBySingerId(singerId).subscribe(data => { this.albums = data });
  }

  // מעבר לשירי אלבום
  getSongs(albumId: number) {
    this.router.navigate(['albumSongs', albumId]);
  }
}

