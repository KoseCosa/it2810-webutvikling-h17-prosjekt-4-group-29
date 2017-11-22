import { TestBed, inject } from '@angular/core/testing';

import { ValidateService } from './validate.service';

describe('ValidateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidateService]
    });
  });

  it('should be created', inject([ValidateService], (service: ValidateService) => {
    expect(service).toBeTruthy();
  }));
  it('Should validate username', inject([ValidateService], (service: ValidateService) => {
    expect(service.validateRegisterFields({username: 'Tom', password: 'supersecret'})).toBe(true);
  }));
  it('Should return false on undefined username', inject([ValidateService], (service: ValidateService) => {
    expect(service.validateRegisterFields({username: undefined, password: 'supersecret'})).toBe(false);
  }));
  it('Should return false on undefined password', inject([ValidateService], (service: ValidateService) => {
    expect(service.validateRegisterFields({username: 'tom', password: undefined})).toBe(false);
  }));
  it('Should return false on undefined searchfield', inject([ValidateService], (service: ValidateService) => {
    expect(service.validateSearchField({text: undefined})).toBe(false);
  }));
  it('Should return undefined if searchfield have value', inject([ValidateService], (service: ValidateService) => {
    expect(service.validateSearchField({text: 'øl'})).toBe(undefined);
  }));
});
