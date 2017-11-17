import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private user = new BehaviorSubject<any>(null);
  currentUser = this.user.asObservable();

  constructor(
    private _http: Http
  ) { }

  changeUser(newUser: any) {
    console.log('New user beeing added:' + newUser);
    this.user.next(newUser);
  }

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
    return this._http.post('http://localhost:3000/api/authenticate', user,
      {headers: headers, withCredentials: true})
      .map(res => res.json());
  }

  loggedIn () {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:3000/api/loggedIn', {headers: headers,
      withCredentials: true})
      .map(res => res.json());
  }
}
