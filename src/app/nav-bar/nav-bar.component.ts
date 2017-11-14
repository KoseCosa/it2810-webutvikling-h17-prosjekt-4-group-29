import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavSearchService } from '../nav-search.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  isCollapsed:Boolean;
  value:string;
  navSubscription: Subscription;

  constructor(private navSearchService: NavSearchService, private router: Router) {
    this.navSubscription  = this.navSearchService
      .getSearchValue()
      .subscribe(value => {
        this.value = value;
      });
  }

  ngOnInit() {
    this.isCollapsed = true;
    this.value = '';
  }

  // Should be used to show search suggestions
  handleKeyUp(value){
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
