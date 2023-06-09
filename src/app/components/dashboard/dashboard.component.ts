import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public headers: string[] = [];
  public rows: any[] = [];

  constructor(public userService: UsersService) {}
  ngOnInit(): void {
      this.getUserLogged();
  }


  getUserLogged() {
    this.userService.getUser().subscribe(user => {
      console.log(user);
    });
 
  }

}
