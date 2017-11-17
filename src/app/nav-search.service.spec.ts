import { TestBed, inject } from '@angular/core/testing';

import { NavSearchService } from './nav-search.service';

describe('NavSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavSearchService]
    });
  });

  it('should be created', inject([NavSearchService], (service: NavSearchService) => {
    expect(service).toBeTruthy();
  }));
});
