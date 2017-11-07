import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users: Array<any>;
  product: Object;

  constructor(private _dataService: DataService) {

    this._dataService.getUsers()
      .subscribe(res => {this.users = res.user; console.log(this.users); console.log(typeof(res));});
    this._dataService.getProduct()
      .subscribe(res => {this.product = res.product; console.log(this.product); console.log(typeof(res));});
       }
}
