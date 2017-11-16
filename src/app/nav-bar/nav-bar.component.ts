import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';
import { NavSearchService } from '../nav-search.service';

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

    constructor(
        private navSearchService: NavSearchService,
        private router: Router,
        private authService: AuthService
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

        this.authService.loggedIn().subscribe( response => {
            console.log(response);
        });
        this.authService.currentUser.subscribe(observedUser =>
            this.loggedInUser = observedUser);

    }

    // Should be used to show search suggestions
    handleKeyUp(value) {
        this.value = value;
    }

    getProducts(query: string) {
        query = query || this.value;
        this.navSearchService.setSearchValue(query);
        this.router.navigate(['/products']);
    }

    ngOnDestroy() {
        this.navSubscription.unsubscribe();
    }
}
