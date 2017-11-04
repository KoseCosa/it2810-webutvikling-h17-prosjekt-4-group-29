import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }

  getUsers() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.get("http://localhost:3000/api/users", {headers: headers})
      .map(result => this.result = result.json());
  }

}
