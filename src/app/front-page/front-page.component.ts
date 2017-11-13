import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  users: Array<any>;
  product: Object;  // Change to array <any> if retrieving multiple products
  reqeusted_product: Array<any>;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
   // Get users
   this._dataService.getUsers().subscribe(res => {
      this.users = res.user;
    });

    /* // Get ONE product
    this._dataService.getProduct().subscribe(res => {
      this.product = res.product;
    });

    // Get queried products, possibly more than one.
    this._dataService.getSpecificProduct().subscribe(res => {
      this.reqeusted_product = res.products;
      console.log(this.reqeusted_product);
    }); */
  }
}
