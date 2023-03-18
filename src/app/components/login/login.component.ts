import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;

  constructor(public usersService: UsersService) {}

  login() {
    const user = {email: this.email, password: this.password};
    this.usersService.login(user).subscribe( data => {
      console.log(data);
    });
    // console.log(this.email);
    // console.log(this.password);
  }
}
