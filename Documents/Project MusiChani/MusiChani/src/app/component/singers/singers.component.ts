import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'src/app/classes/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.scss']
})
export class SingersComponent {
  singers: Array<users> = new Array<users>();
  singer: users = new users();

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.usersService.getArtists().subscribe(data => {this.singers = data});
  }

  beyondTheSingerPage(singerId: number | undefined) {
    if(singerId) {
      this.router.navigate(['singerPage', singerId]);
    }
  }

}
