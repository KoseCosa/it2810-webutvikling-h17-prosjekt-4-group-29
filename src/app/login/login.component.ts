import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ValidateService } from '../validate.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;

    constructor(private authService: AuthService,
                private router: Router,
                private validateService: ValidateService, ) {
    }

    ngOnInit() {
    }

    onSubmitClick() {
        console.log('click');
        const user = {
            username: this.username,
            password: this.password
        };

        if (!this.validateService.validateLoginFields(user)) {
            console.log('err');
            return false;
        }

        this.authService.login(user).subscribe(response => {
            console.log('aClick');
            if (response.success) {
                console.log('sussessu');
                this.router.navigate(['/mypage']);
            } else {
                console.log('error');
            }
        });
    }
}
