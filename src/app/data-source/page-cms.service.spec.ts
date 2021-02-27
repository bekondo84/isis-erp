import { TestBed, inject } from '@angular/core/testing';

import { PageCmsService } from './page-cms.service';

describe('PageCmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageCmsService]
    });
  });

  it('should be created', inject([PageCmsService], (service: PageCmsService) => {
    expect(service).toBeTruthy();
  }));
});
