import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { NavSearchService } from '../nav-search.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  // State
  products = [];
  autoCompleteResults = [];
  loadingMore = false;
  dataAvailable = true;
  showFilters = true;
  navSubscription: Subscription;

  productTypeFilters = [];
  activeFilters = {
    productTypes: []
  };

  availableSortOptions = [
    {label: 'Navn', value: 'Varenavn' },
    {label: 'Pris', value: 'Pris'},
    {label: 'Land', value: 'Land'}
  ];

  // Search Values
  searchValue = '';
  selectedSortOption = this.availableSortOptions[0];

  constructor(private _dataService: DataService, private navSearchService: NavSearchService) {
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
    .getProductTypes()
    .subscribe(res => {
      this.productTypeFilters = res.productTypes.map(function(productType, index){
        return {name: productType, state: false}
      });
    });
  }

  ngOnInit() { }

  setActiveFilters(): void {
    this.activeFilters = {
      productTypes: this.productTypeFilters.filter(function(productType){
        return productType.state;
      }).map(function(producType){
        return producType.name;
      })
    }
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
        this.dataAvailable = res.product.length < 21 ? false : true;
      });
    }
  }
  sort(): void {
    this.reload();
  }

  reload(): void {
    this.setActiveFilters();

    const searchObject = {
      value: this.searchValue,
      startIndex: 0,
      skip: 0,
      limit: this.products.length,
      sort: this.selectedSortOption.value,
      filters: this.activeFilters
    };

    this._dataService
    .getProducts(searchObject)
    .subscribe(res => {
      this.products = res.product;
      this.loadingMore = false;
      // TODO: Implement dataAvailable update based on total query hits instead
      this.dataAvailable = res.product.length < 21 ? false : true;
    });
  }
  setActiveFilters(): void {
    this.activeFilters = {
      productTypes: this.productTypeFilters.filter(function(productType){
        return productType.state;
      }).map(function(producType){
        return producType.name;
      })
    }
  }


  search(): void {
    this.autoCompleteResults = [];

    this.setActiveFilters();

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
    return this.products.length > 1 ? 'col-md-4' : 'col-md-12';
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }
}
