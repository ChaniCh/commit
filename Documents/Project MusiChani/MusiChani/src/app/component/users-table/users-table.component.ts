import { Component } from '@angular/core';
import { users } from 'src/app/classes/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  user: users = new users();
  users: Array<users> = new Array<users>();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(data => { this.users = data }, error => { console.log('error', error)});
  }

  // עדכון משתמש

  // מחיקת משתמש
  deleteUser(userId: number) {
    this.usersService.deleteUser(userId).subscribe(data => { this.users = data }, error => { console.log('error', error) });
  }

}
