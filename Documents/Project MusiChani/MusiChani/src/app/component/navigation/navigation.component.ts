import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(public usersService: UsersService) { }

}
