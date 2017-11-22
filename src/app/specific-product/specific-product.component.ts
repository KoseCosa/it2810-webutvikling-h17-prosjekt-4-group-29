import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css']
})
export class SpecificProductComponent implements OnInit, OnDestroy {

  id: Number;
  loggedInUser = Object;
  routerSubscription: Subscription;
  product;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
    ) {

  }

  ngOnInit() {
    this.routerSubscription = this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['varenummer'], 10);
      this.dataService
        .getSpecificProduct(this.id)
        .subscribe(value => {
          if(value.json().product) {
            this.product = value.json().product;
            this.titleService.setTitle(this.product.Varenavn);
          }
      });
    });

    this.authService.currentUser.subscribe(observedUser => {
      if (observedUser) {
        this.dataService.getUserFavorites(observedUser._id).subscribe(userFavorites => {
          observedUser['favorites'] = userFavorites.favorites.favorites;
        });
        this.loggedInUser = observedUser;
      }
    });
  }

  getImgSrc(productNumber) {
    return 'https://bilder.vinmonopolet.no/cache/300x300-0/' + productNumber.toString() + '-1.jpg';
  }

  addFavorite(newObjectID) {
    if (this.loggedInUser['favorites'].includes(newObjectID)) {
      window.alert('This one is allready among your loved ones!');
    } else {
      const tempUser = this.loggedInUser;
      tempUser['favorites'].push(newObjectID);
      const updateValues = [tempUser, newObjectID];
      this.dataService.updateRemoteUser(updateValues);
    }
  }

  removeFavorite(objectID) {
    if (!this.loggedInUser['favorites'].includes(objectID)) {
      window.alert('Something went wrong, this should not be here!?');
    } else {
      const tempUser = this.loggedInUser;
      const removeIndex = tempUser['favorites'].indexOf(objectID);
      tempUser['favorites'].splice(removeIndex, 1);
      const updateValues = [tempUser, objectID];
      this.dataService.removeUserFavorite(updateValues).subscribe( res => {
      });
    }
  }

  ngOnDestroy() {
    this.titleService.setTitle('iDrink');
    this.routerSubscription.unsubscribe();
  }
}
