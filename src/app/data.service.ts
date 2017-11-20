import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  constructor(private _http: Http) { }

  getUsers() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this._http.get('http://localhost:3000/api/users', {headers: headers})
      .map(res => res.json());
  }

  getProducts(search) {
    const headers = new Headers();
    const params = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    params.set('search', JSON.stringify(search));

    return this._http.get('http://localhost:3000/api/products', {headers: headers, params: params})
      .map(res => res.json());
  }

  getProductTypes() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this._http.get('http://localhost:3000/api/producttypes', {headers: headers})
      .map(res => res.json());
  }

  getSpecificProduct() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:3000/api/specificProducts', {headers: headers})
      .map(res => res.json());
  }

  getAutoComplete(search) {
    const headers = new Headers();
    const params = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    params.set('search', JSON.stringify(search));

    return this._http.get('http://localhost:3000/api/autocomplete', {headers: headers, params: params})
      .map(res => res.json());
  }
}
