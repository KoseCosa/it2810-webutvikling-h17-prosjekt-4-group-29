import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css']
})
export class SpecificProductComponent implements OnInit {

  id: Number;
  product = {};

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['varenummer']);
    });

    this.dataService
      .getSpecificProduct(this.id)
      .subscribe(value => {
        this.product = value.product;
      });
  }
}
