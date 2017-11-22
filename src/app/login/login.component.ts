import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ValidateService } from '../validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loggedInUser: any;
  username: String;
  password: String;
  loginError: boolean;
  emptyUser: boolean;
  emptyPass: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService ) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(observedUser => this.loggedInUser = observedUser);
    this.authService.loggedIn().subscribe(res => {
      if (res.success) {
        console.log(res);
        this.router.navigate((['/unauthorized']));
      }
    });
  }

  onSubmitClick() {
    const user = {
      username: this.username,
      password: this.password
    };

    if (! this.username || this.username.length === 0) {
      this.emptyUser = true;
    }

    if (! this.password || this.password.length === 0) {
      this.emptyPass = true;
    }

    if (!this.validateService.validateLoginFields(user)) {
      return false;
    }

    this.authService.login(user).subscribe(response => {
      if (response.success) {
        this.loginError = false;
        this.authService.changeUser(response.user);
        this.router.navigate(['/mypage']);
      } else {
        this.loginError = true;
      }
    });
  }
}
