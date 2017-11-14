import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavSearchService {
  private searchValue: Subject<string> = new Subject<string>();

  setSearchValue(value: string) {
    this.searchValue.next(value);
  }

  getSearchValue(): Observable<string> {
    return this.searchValue;
  }
}
