import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AuthService } from '../auth.service';
import { ValidateService } from '../validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  display = false;
  username: String;
  password: String;
  registerError: boolean;
  emptyUser: boolean;
  emptyPass: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService,
  ) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe( res => {
      if (res.success) {
        this.router.navigate(['/unauthorized']);
      }
      this.display = true;
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

    // Validation of fields
    if (!this.validateService.validateRegisterFields(user)) {
      return false;
    }

    // Register user
    this.authService.register(user).subscribe(response => {
      if (response.success) {
        this.authService.login(user).subscribe(res => {
          if (res.success) {
            this.registerError = false;
            this.authService.changeUser(response.user);
            this.router.navigate(['/mypage']);
          } else {
            console.log('error');
          }
        });
      } else {
        this.registerError = true;
        this.router.navigate(['/register']);
      }
    });
  }
}
