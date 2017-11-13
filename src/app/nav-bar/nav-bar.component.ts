import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    isCollapsed: Boolean;

    constructor(private authService: AuthService,
    ) { }

  ngOnInit() {
    this.isCollapsed = true;
    this.authService.loggedIn().subscribe( response => {
        console.log(response);
    });
  }
}
