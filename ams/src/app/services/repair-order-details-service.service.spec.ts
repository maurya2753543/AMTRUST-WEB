import { TestBed, inject } from '@angular/core/testing';

import { RepairOrderDetailsServiceService } from './repair-order-details-service.service';

describe('RepairOrderDetailsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepairOrderDetailsServiceService]
    });
  });

  it('should be created', inject([RepairOrderDetailsServiceService], (service: RepairOrderDetailsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
