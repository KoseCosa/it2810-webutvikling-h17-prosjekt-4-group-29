import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: Array<any>;
  product: Object;  // Change to array <any> if retrieving multiple products
  reqeusted_product: Array<any>;

  constructor(private _dataService: DataService) {
    // Get users
    this._dataService.getUsers()
      .subscribe(res => { this.users = res.user; });

  }
}
