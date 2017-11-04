import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users: Object;

  constructor(private _dataService: DataService) {

    this._dataService.getUsers()
      .subscribe(res => {this.users = res.user.name; console.log(this.users); console.log(typeof(res));});

  }

}
