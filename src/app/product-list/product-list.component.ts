import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products = [];
  searchValue = '';
  loadingMore = false;
  dataAvailable = true;


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

  constructor(private _dataService: DataService) {
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
    this.loadMore();
  }

}
