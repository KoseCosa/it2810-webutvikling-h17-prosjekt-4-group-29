import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { NavSearchService } from '../nav-search.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  loggedInUser = Object;
  products = [];
  searchValue = '';
  loadingMore = false;
  dataAvailable = true;
  autoCompleteResults = [];
  navSubscription: Subscription;

  constructor(
    private _dataService: DataService,
    private navSearchService: NavSearchService,
    private authService: AuthService
  ) {
    this.navSubscription  = this.navSearchService
      .getSearchValue()
      .subscribe(value => {
        this.searchValue = value;
        this.search();
      });
    window.onscroll = () => {
      const windowHeight = 'innerHeight' in window ? window.innerHeight
        : document.documentElement.offsetHeight;
      const body = document.body, html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        this.loadMore();
      }
    };
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(observedUser => {
      if (observedUser) {
        this._dataService.getUserFavorites(observedUser._id).subscribe(userFavorites => {
          observedUser['favorites'] = userFavorites.favorites.favorites;
        });
        this.loggedInUser = observedUser;
        console.log(this.loggedInUser);
      }
    });
  }

  loadMore(): void {
    if (this.dataAvailable && !this.loadingMore) {
      this.loadingMore = true;

      const searchObject = {
        value: this.searchValue,
        startIndex: this.products.length
      };

      this._dataService
        .getProducts(searchObject)
        .subscribe(res => {
          this.products = this.products.concat(res.product);
          this.loadingMore = false;
          // TODO: Implement dataAvailable update based on total query hits instead
          this.dataAvailable = res.product.length < 21 ? false : true;
        });
    }
  }

  search(): void {
    this.autoCompleteResults = [];
    const searchObject = {
      value: this.searchValue,
      startIndex: 0
    };

    this._dataService
      .getProducts(searchObject)
      .subscribe(res => {
        this.products = res.product;
        this.dataAvailable = res.product.length < 21 ? false : true;
      });
  }

  updateNav() {
    this.navSearchService.setSearchValue(this.searchValue);
  }

  handleKeyUp(value, event) {
    this.searchValue = value;
    const eventKey = event ? event.key : '';

    this.searchValue.length > 2 && eventKey !== 'Enter' ?
      this._dataService
        .getAutoComplete({value: this.searchValue, startIndex: 0})
        .subscribe(result => {
          this.autoCompleteResults = result.product;
        })
      : this.autoCompleteResults = [];
  }

  handleListEvent(event) {
    this.searchValue = event.target.innerText;
    this.search();
  }

  getProductListClass(): string {
    return this.products.length > 1 ? 'col-sm-4' : 'col-sm-12';
  }

  addFavorite(newObjectID) {
    if (this.loggedInUser['favorites'].includes(newObjectID)) {
      window.alert('This one is allready among your loved ones!');
    } else {
      const tempUser = this.loggedInUser;
      tempUser['favorites'].push(newObjectID);
      const updateValues = [tempUser, newObjectID];
      this._dataService.updateRemoteUser(updateValues);
    }
  }

  removeFavorite(objectID) {
    if (!this.loggedInUser['favorites'].includes(objectID)) {
      window.alert('Something went wrong, this should not be here!?');
    } else {
      const tempUser = this.loggedInUser;
      const removeIndex = tempUser['favorites'].indexOf(objectID);
      tempUser['favorites'].splice(removeIndex, 1);
      const updateValues = [tempUser, objectID];
      this._dataService.removeUserFavorite(updateValues).subscribe( res => {
      });
    }
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }
}
