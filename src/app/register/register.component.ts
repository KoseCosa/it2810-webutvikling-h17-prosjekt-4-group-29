import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ValidateService } from './validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
