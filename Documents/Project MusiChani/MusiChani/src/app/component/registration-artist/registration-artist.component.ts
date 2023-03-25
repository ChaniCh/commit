import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { requests } from 'src/app/classes/requests';
import { users } from 'src/app/classes/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registration-artist',
  templateUrl: './registration-artist.component.html',
  styleUrls: ['./registration-artist.component.scss']
})
export class RegistrationArtistComponent {
  // user: users = new users();
  request: requests = new requests();
  // users: Array<users> = new Array<users>();
  requests: Array<requests> = new Array<requests>();
  registerForm:any = FormGroup;
  submitted = false;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder) { }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      // phone: ['']
      // password: ['', [Validators.required]]
    });
  }

  artistRequest() {
    this.submitted = true;
    if(this.registerForm.invalid) {
      return;
    }

    this.usersService.AddRequest(this.request).subscribe(data => { this.requests = data }, error => { console.log('error', error) });
  }

}
