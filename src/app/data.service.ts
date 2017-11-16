import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    result: any;
    result2: any;
    result3: any;

    constructor(private _http: Http) { }

    getUsers() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('http://localhost:3000/api/users', {headers: headers, withCredentials: true})
            .map(result => this.result = result.json());
    }

    getUser() {
        const headers = new Headers();
        headers.append('content-type', 'applcation/json');
        return this._http.get('http://localhost:3000/');
    }

    getProduct() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('http://localhost:3000/api/products', {headers: headers})
            .map(result2 => this.result2 = result2.json());
    }
    getProducts(search) {
        const headers = new Headers();
        const params = new URLSearchParams();

        headers.append('Content-Type', 'application/json');
        params.set('search', JSON.stringify(search))

        return this._http.get('http://localhost:3000/api/products', {headers: headers, params: params})
            .map(res => res.json());
    }

    getSpecificProduct() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('http://localhost:3000/api/specificProducts', {headers: headers})
            .map(result3 => this.result3 = result3.json());
    }
}
