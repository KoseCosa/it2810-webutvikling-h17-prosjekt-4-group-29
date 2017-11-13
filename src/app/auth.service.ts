import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    user: any;

    constructor(
        private _http: Http
    ) { }

    register(user) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:3000/api/registerUser', user, {headers: headers})
            .map(res => res.json());
    }

    login(user) {
        console.log('auth');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:3000/api/authenticate', user, {headers: headers, withCredentials: true})
            .map(res => res.json());
    }

    loggedIn () {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('http://localhost:3000/api/loggedIn', {headers: headers, withCredentials: true})
            .map(res => res.json());
    }

}
