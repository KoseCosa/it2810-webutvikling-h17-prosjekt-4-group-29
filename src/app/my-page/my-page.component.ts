import { Component, OnInit } from '@angular/core';

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
  wordData = [];
  loaded: Promise<boolean>;
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
      this._dataService.getUserFavoriteObjects(this.loggedInUser._id).subscribe(result => {
        this.products = result.products;
        const tempFavorites = [];
        result.products.map( function (product) {
          tempFavorites.push(product._id);
        });
        this.userFavorites = tempFavorites;
        console.log(this.userFavorites);
        this.wordData = this.populateWordCloud(result.products);
        if (this.wordData[0]) {
          this.loaded = Promise.resolve(true);
        } else {
          this.loaded = Promise.resolve(false);
        }
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
    if (lowest === highest) {
      return [false];
    }else {
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
}
