import { TestBed, inject } from '@angular/core/testing';

import { ArcListServiceService } from './arc-list-service.service';

describe('ArcListServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArcListServiceService]
    });
  });

  it('should be created', inject([ArcListServiceService], (service: ArcListServiceService) => {
    expect(service).toBeTruthy();
  }));
});
