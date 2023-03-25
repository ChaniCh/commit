import { Component } from '@angular/core';
import { users } from 'src/app/classes/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.scss']
})
export class SingersComponent {
  artists: Array<users> = new Array<users>();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getArtists().subscribe(data => {this.artists = data});
  }

}
