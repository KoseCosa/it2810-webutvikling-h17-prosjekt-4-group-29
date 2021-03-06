import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  // User
  loggedInUser = Object;
  // Search
  searchValue = '';
  availableSortOptions = [
    {label: 'APK - Synkende', value: {APK: -1}},
    {label: 'APK - Stigende', value: {APK: 1}},
    {label: 'Navn - Stigende', value: {Varenavn: 1}},
    {label: 'Navn - Synkende', value: {Varenavn: -1}},
    {label: 'Pris - Stigende', value: {Pris: 1}},
    {label: 'Pris - Synkende', value: {Pris: -1}},
    {label: 'Land - Stigende', value: {Land: 1}},
    {label: 'Land - Synkende', value: {Land: -1}},
  ];
  selectedSortOption = this.availableSortOptions[0];
  productTypeFilters = [];
  countryFilters = [];
  activeFilters = {
    productTypes: [],
    countries: []
  };
  // AutoComplete
  autoCompleteResults = [];
  // Loading
  loadingMore = false;
  dataAvailable = true;
  favoriteRequest = false;
  products = [];
  // Subscriptions
  navSubscription: Subscription;
  userFavoriteSub: Subscription;
  // GUI
  showFilters = false;
  showProductTypeFilters = false;
  showCountriesFilters = false;

  constructor(
    private router: Router,
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

    // ScrollDetection
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

    this._dataService
      .getCountries()
      .subscribe(res => {
        this.countryFilters = res.countries.map(function(country, index){
          return {name: country, state: false};
        });
      });

    this._dataService
      .getProductTypes()
      .subscribe(res => {
        this.productTypeFilters = res.productTypes.map(function(productType, index){
          return {name: productType, state: false};
        });
      });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(observedUser => {
      if (observedUser) {
        this.userFavoriteSub = this._dataService.getUserFavorites(observedUser._id).subscribe(userFavorites => {
          observedUser['favorites'] = userFavorites.favorites.favorites;
        });
        this.loggedInUser = observedUser;
      }
    });
  }

  loadMore(): void {
    if (this.dataAvailable && !this.loadingMore) {
      this.loadingMore = true;

      const searchObject = {
        value: this.searchValue,
        startIndex: this.products.length,
        sort: this.selectedSortOption.value,
        filters: this.activeFilters
      };

      this._dataService
        .getProducts(searchObject)
        .subscribe(res => {
          this.products = this.products.concat(res.product);
          this.loadingMore = false;
          // TODO: Implement dataAvailable update based on total query hits instead
          this.dataAvailable = res.product.length < 20 ? false : true;
        });
    }
  }
  sort(): void {
    this.reload();
  }

  reload(): void {
    const searchObject = {
      value: this.searchValue,
      startIndex: 0,
      skip: 0,
      limit: this.products.length > 20 ? this.products.length : 20,
      sort: this.selectedSortOption.value,
      filters: this.activeFilters
    };

    this._dataService
      .getProducts(searchObject)
      .subscribe(res => {
        this.products = res.product;
        this.loadingMore = false;
        // TODO: Implement dataAvailable update based on total query hits instead
        this.dataAvailable = res.product.length < 20 ? false : true;
      });
  }
  setActiveFilters(): void {
    this.showFilters = !this.showFilters;
    this.activeFilters = {
      productTypes: this.productTypeFilters.filter(function(productType){
        return productType.state;
      }).map(function(producType){
        return producType.name;
      }),
      countries: this.countryFilters.filter(function(country){
        return country.state;
      }).map(function(country){
        return country.name;
      }),
    };
    this.reload();
  }


  search(): void {
    this.autoCompleteResults = [];

    const searchObject = {
      value: this.searchValue,
      startIndex: 0,
      sort: this.selectedSortOption.value,
      filters: this.activeFilters
    };

    this._dataService
      .getProducts(searchObject)
      .subscribe(res => {
        this.products = res.product;
        this.dataAvailable = res.product.length < 20 ? false : true;
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
    return this.products.length > 1 ? 'col-md-6' : 'col-md-12';
  }

  addFavorite(newObjectID) {
    if (this.loggedInUser['favorites'].includes(newObjectID)) {
      window.alert('This one is allready among your loved ones!');
    } else if (!this.favoriteRequest) {
      this.favoriteRequest = true;
      this.userFavoriteSub.unsubscribe();
      // const tempUser = this.loggedInUser;
      this.loggedInUser['favorites'].push(newObjectID);
      // tempUser['favorites'].push(newObjectID);
      const updateValues = [this.loggedInUser, newObjectID];
      this._dataService.updateRemoteUser(updateValues).subscribe( res => {
        this.favoriteRequest = false;
      });
    }
  }

  removeFavorite(objectID) {
    if (!this.loggedInUser['favorites'].includes(objectID)) {
      window.alert('Something went wrong, this should not be here!?');
    } else if (!this.favoriteRequest) {
      this.favoriteRequest = true;
      const tempUser = this.loggedInUser;
      const removeIndex = tempUser['favorites'].indexOf(objectID);
      tempUser['favorites'].splice(removeIndex, 1);
      const updateValues = [tempUser, objectID];
      this._dataService.removeUserFavorite(updateValues).subscribe( res => {
        this.favoriteRequest = false;
      });
    }
  }

  redirectToSpecificProduct(productNumber) {
    const link = '/products/' + productNumber.toString();
    if (productNumber) {
     this.router.navigate([link]);
   }
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }
}
