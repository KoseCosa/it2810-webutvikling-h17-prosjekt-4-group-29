import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  
  user: any;

  constructor(
  private _http : Http
  ) { }

}