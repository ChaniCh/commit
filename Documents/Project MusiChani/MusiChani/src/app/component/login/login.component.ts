import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { users } from 'src/app/classes/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  registerForm:any = FormGroup;
  user: users = new users();
  listUsers: Array<users> = new Array<users>();
  submitted = false;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private router:Router) { }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  email = '';
  password ='';

  login() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    this.usersService.login(this.email, this.password).subscribe(data => {this.user = data; 
      this.router.navigate(['/homepage']);}, 
      error => {alert('error')});
  }

}
