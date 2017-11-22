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
    this.user.next(newUser);
  }

  register(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:8084/api/registerUser', user, {headers: headers})
      .map(res => res.json());
  }

  login(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:8084/api/authenticate', user,
      {headers: headers, withCredentials: true})
      .map(res => res.json());
  }

  loggedIn () {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:8084/api/loggedIn', {headers: headers,
      withCredentials: true}).map(res => res.json());
  }

  logout() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:8084/api/logout',
      {headers: headers, withCredentials: true})
      .map(res => res.json());
  }


}
