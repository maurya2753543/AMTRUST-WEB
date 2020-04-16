import { TestBed, inject } from '@angular/core/testing';

import { RepairProgressServiceService } from './repair-progress-service.service';

describe('RepairProgressServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepairProgressServiceService]
    });
  });

  it('should be created', inject([RepairProgressServiceService], (service: RepairProgressServiceService) => {
    expect(service).toBeTruthy();
  }));
});
