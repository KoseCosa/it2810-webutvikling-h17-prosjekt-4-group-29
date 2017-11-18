import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})

export class MyPageComponent implements OnInit {
  loggedInUser: any;
  products = [];
  userFavorites = [];
  constructor(
    private _dataService: DataService,
    private authService: AuthService
  ) {  }

  ngOnInit() {
    this.authService.currentUser.subscribe(observedUser => {
      this.loggedInUser = observedUser;
      this.updateProductList();
    });
  }

  updateProductList() {
    if (this.loggedInUser) {
      this._dataService.getUserFavorites(this.loggedInUser._id).subscribe(result => {
        this.userFavorites = result.favorites.favorites;
        this._dataService.getProductsById(this.userFavorites).subscribe(products => {
          this.products = products.product;
        });
      });
    }
  }

  getProductListClass(): string {
    return this.products.length > 1 ? 'col-sm-4' : 'col-sm-12';
  }

  onButtonClick(objectID) {
    if (!this.userFavorites.includes(objectID)) {
      window.alert('Something went wrong, this should not be here!?');
    } else {
      const updateValues = [this.loggedInUser._id, objectID];
      this._dataService.removeUserFavorite(updateValues).subscribe( res => {
        this.updateProductList();
      });
    }
  }
}
