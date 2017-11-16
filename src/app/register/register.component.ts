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
    name: String;
    username: String;
    email: String;
    password: String;

    constructor(
        private authService: AuthService,
        private router: Router,
        private validateService: ValidateService,
    ) { }

    ngOnInit() {
    }

    onSubmitClick() {
        const user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
        };

        // Validation of fields
        if (!this.validateService.validateRegisterFields(user)) {
            return false;
        }

        // Register user
        this.authService.register(user).subscribe(response => {
            if (response.success) {
                this.router.navigate(['/login']);
            } else {
                this.router.navigate(['/register']);
            }
        });
    }
}
