import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AgWordCloudData } from 'angular4-word-cloud';
import 'rxjs/add/operator/map';


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
  loaded: Promise<boolean>;
  wordData = [];
  colors = ['d90a2d', 'ea2d44', 'e6535b', 'e86e59', 'ec7c55', 'ff24ba', 'ff54ba'];
  options = {
    settings: {
      minFontSize: 1,
      maxFontSize: 10,
    },
    margin: {
      top: -15,
      right: -0,
      bottom: -0,
      left: -17
    },
  };
  constructor(
    private _dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.authService.currentUser.subscribe(observedUser => {
      this.loggedInUser = observedUser;
      this.updateProductList();
    });
  }

  updateProductList() {
    if (this.loggedInUser) {
      this._dataService.getUserFavoriteObjects(this.loggedInUser._id).subscribe(result => {
        this.products = result.products;
        const tempFavorites = [];
        result.products.map( function (product) {
          tempFavorites.push(product._id);
        });
        this.userFavorites = tempFavorites;
        this.wordData = this.populateWordCloud(result.products);
        this.loaded = Promise.resolve(true);
      });
    }
  }

  getProductListClass(): string {
    return this.products.length > 1 ? 'col-sm-6' : 'col-sm-12';
  }

  populateWordCloud(products) {
    const tempWords = [];
    const tempWordData = [];
    let highest = 10;
    let lowest = 10;
    products.map( function (product) {
      if (tempWords.includes(product.Varetype)) {
        tempWordData.map( function (word) {
          if (word.text.match(product.Varetype)) {
            word.size += 2;
          }
          if (word.size > highest) {
            highest += 2;
          } else if (word.size <= lowest) {
            lowest += 2;
          }
        });
      } else {
        tempWords.push(product.Varetype);
        tempWordData.push({size: 10, text: product.Varetype});
      }
    });
    if (lowest === highest || tempWordData.length === 1) {
      console.log(tempWordData.length);
      return [
        {size: 10, text: 'Legg'},
        {size: 11, text: 'Til'},
        {size: 12, text: 'Flere'},
        {size: 13, text: 'Varer'}
        ];
    } else {
      return tempWordData;
    }
  }

  onButtonClick(objectID) {
    if (!this.userFavorites.includes(objectID)) {
      window.alert('Something went wrong, this should not be here!?');
    } else {
      const updateValues = [this.loggedInUser, objectID];
      this._dataService.removeUserFavorite(updateValues).subscribe( res => {
        this.updateProductList();
      });
    }
  }

  redirectToSpecificProduct(productNumber) {
    const link = '/products/' + productNumber.toString();
    if (productNumber) {
     this.router.navigate([link]);
   }
  }
}
