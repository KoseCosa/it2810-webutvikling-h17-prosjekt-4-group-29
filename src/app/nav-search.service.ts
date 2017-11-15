import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavSearchService {
  private searchValue: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setSearchValue(value: string) {
    this.searchValue.next(value);
  }

  getSearchValue(): Observable<string> {
    return this.searchValue;
  }
}
