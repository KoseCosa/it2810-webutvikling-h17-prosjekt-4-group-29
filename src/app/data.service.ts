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

  getProductsById(idList) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    const params = {idList: idList};

    return this._http.get('http://localhost:3000/api/productsById', {headers: headers, params: params})
      .map(res => res.json());
  }

  getUserFavorites(userID) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const params = {user: userID};

    return this._http.get('http://localhost:3000/api/userFavorites', {headers: headers, params: params})
      .map(res => res.json());
  }

  updateRemoteUser(updateValues) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this._http.post('http://localhost:3000/api/addFavorites', updateValues,
      {headers: headers, withCredentials: true}).subscribe();
  }

  removeUserFavorite(updateValues) {
    const headers = new Headers();
    const params = {updateValues: updateValues};
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:3000/api/removeFavorite',
      {headers: headers, params: params, withCredentials: true});
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
