import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  passwordError: boolean | undefined;

  constructor(public usersService: UsersService, public router: Router) {}

  register() {
    const user = {email: this.email, password: this.password};
    this.usersService.register(user).subscribe(data => {
      this.usersService.setToken(data.token);
      this.router.navigateByUrl('/dashboard');
      // console.log(data);
    });
    // console.log(this.email);
    // console.log(this.password);
  }
}
