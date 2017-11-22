import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { NavSearchService } from '../nav-search.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  isCollapsed: Boolean;
  value: string;
  navSubscription: Subscription;
  loggedInUser: object;
  username = '';
  autoCompleteResults = [];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private navSearchService: NavSearchService,
    private router: Router
  ) {
    this.navSubscription  = this.navSearchService
      .getSearchValue()
      .subscribe(value => {
        this.value = value;
      });
  }

  ngOnInit() {
    this.isCollapsed = true;
    this.value = '';

    this.authService.loggedIn().subscribe(res => this.authService.changeUser(res.user));
    this.authService.currentUser.subscribe(observedUser => {
      this.loggedInUser = observedUser;
      if (observedUser) {
        this.username = observedUser.username;
      }
    });
  }

  // Should be used to show search suggestions
  handleKeyUp(value, event) {
    this.value = value;
    const eventKey = event ? event.key : '';

    value.length > 2 && eventKey !== 'Enter' ?
      this.dataService
        .getAutoComplete({value: value, startIndex: 0})
        .subscribe(result => {
          this.autoCompleteResults = result.product;
        })
      : this.autoCompleteResults = [];
  }

  getProducts(query: string) {
    query = query || this.value;
    this.navSearchService.setSearchValue(query);
    this.autoCompleteResults = [];
    this.router.navigate(['/products']);
  }

  handleListEvent(result) {
    this.value = result.Varenavn;
    this.navSearchService.setSearchValue(this.value);
    this.autoCompleteResults = [];

    const link = '/products/' + result.Varenummer.toString();
    this.router.navigate([link]);
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

  onLogoutClick() {
    this.authService.logout().subscribe(res => {
      if (res.success) {
        console.log('User logged out on serverside successfully');
        this.authService.changeUser(null);
        window.location.reload();
        this.router.navigate(['/']);
      }
    });
  }
}
