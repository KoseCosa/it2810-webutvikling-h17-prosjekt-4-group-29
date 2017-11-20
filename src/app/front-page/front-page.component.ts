import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  loggedInUser: any;
  users: Array<any>;
  product: Object;  // Change to array <any> if retrieving multiple products
  reqeusted_product: Array<any>;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }
}
