import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { NavSearchService } from '../nav-search.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})

export class MyPageComponent implements OnInit {
  loggedInUser: any;
  products = [];
  loadingMore = false;
  dataAvailable = true;
  userFavorites = [];
  constructor(
    private _dataService: DataService,
    private authService: AuthService
  ) {
    window.onscroll = () => {
      const windowHeight = 'innerHeight' in window ? window.innerHeight
        : document.documentElement.offsetHeight;
      const body = document.body, html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      /*if (windowBottom >= docHeight) {
        this.loadMore();
      }*/
    };
  }

  ngOnInit() {
    console.log('mypage stuff');

    this.authService.currentUser.subscribe(observedUser => {
      this.loggedInUser = observedUser;
      this._dataService.getUserFavorites(this.loggedInUser._id).subscribe(result => {
        this.userFavorites = result.favorites.favorites;
        this._dataService.getProductsById(this.userFavorites).subscribe(products => {
            this.products = products.product;
            console.log(this.products);
          });
      });
    });

    /*
    this.authService.currentUser.subscribe(observedUser =>
      this.loggedInUser = observedUser);
    console.log(this._dataService.getUserFavorites(this.loggedInUser._id).subscribe(result =>
      this.userFavorites = result.favorites
    ));
    console.log(this._dataService.getProductsById(this.userFavorites)
      .subscribe(result => {
        this.products = result;
      }));*/
  }

  loadMore(): void {
    if (this.dataAvailable && !this.loadingMore) {
      this.loadingMore = true;

      this._dataService
        .getProductsById(this.loggedInUser._id)
        .subscribe(res => {
          this.products = this.products.concat(res.product);
          this.loadingMore = false;
          // TODO: Implement dataAvailable update based on total query hits instead
          this.dataAvailable = res.product.length < 21 ? false : true;
        });
    }
  }

  getProductListClass(): string {
    return this.products.length > 1 ? 'col-sm-4' : 'col-sm-12';
  }

  onButtonClick(newObjectID) {
    if (this.loggedInUser['favorites'].includes(newObjectID)) {
      window.alert('This one is allready among your loved ones!');
    } else {
      const tempUser = this.loggedInUser;
      tempUser['favorites'].push(newObjectID);
      this.authService.changeUser(tempUser);
      const updateValues = [tempUser, newObjectID];
      this.authService.updateRemoteUser(updateValues); // is subscribe really nescesarry ?
    }
  }
}
