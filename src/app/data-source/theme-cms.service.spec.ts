import { TestBed, inject } from '@angular/core/testing';

import { ThemeCmsService } from './theme-cms.service';

describe('ThemeCmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeCmsService]
    });
  });

  it('should be created', inject([ThemeCmsService], (service: ThemeCmsService) => {
    expect(service).toBeTruthy();
  }));
});
