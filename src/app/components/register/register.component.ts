import { Component } from '@angular/core';
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

  constructor(public usersService: UsersService) {}

  register() {
    const user = {email: this.email, password: this.password};
    this.usersService.register(user).subscribe(data => {
      console.log(data);
    });
    // console.log(this.email);
    // console.log(this.password);
  }
}
