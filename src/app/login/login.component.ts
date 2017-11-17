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

  constructor(
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService ) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(observedUser => this.loggedInUser = observedUser);
    if (this.loggedInUser != null) {
      this.router.navigate(['/mypage']);
    }
  }

  onSubmitClick() {
    const user = {
      username: this.username,
      password: this.password
    };

    if (!this.validateService.validateLoginFields(user)) {
      console.log('err');
      return false;
    }

    this.authService.login(user).subscribe(response => {
      if (response.success) {
        this.authService.changeUser(response.user);
        this.router.navigate(['/mypage']);
      } else {
        console.log('error');
      }
    });
  }
}
