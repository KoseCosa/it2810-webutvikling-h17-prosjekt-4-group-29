import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateLoginFields(user) {
    if (user.username === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }
  validateRegisterFields(user) {
    if (user.username === undefined || user.password === undefined) {
      return false;
    }
    if (!this.validatePassword(user.password)) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    /*     var patt = new RegExp("^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>"+
                              "()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$", "i");
        return patt.test(email); */
    return true;
  }

  validateSearchField(search) {
    if (search.text === undefined) {
      return false;
    }
      /*     var patt = new RegExp(^[A-Za-z]*[A-Za-z][A-Za-z]*$);
          return patt.test(search); */
  }

  validatePassword(password) {
    /*      var patt = new RegExp(^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$);
         return patt.test(password); */
    return true;
  }
}
