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

  products = [];
  searchValue = '';
  loadingMore = false;
  dataAvailable = true;
  navSubscription: Subscription;

   constructor(private _dataService: DataService, private navSearchService: NavSearchService) {
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

  ngOnInit() { }

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

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }
}
