import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  users: Array<any>;
  loggedInUser: any;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe(res => {
      this.users = res.user;
    });
    this.authService.currentUser.subscribe(observedUser =>
      this.loggedInUser = observedUser);
  }
}
