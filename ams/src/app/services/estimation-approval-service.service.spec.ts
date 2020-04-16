import { TestBed, inject } from '@angular/core/testing';

import { EstimationApprovalServiceService } from './estimation-approval-service.service';

describe('EstimationApprovalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstimationApprovalServiceService]
    });
  });

  it('should be created', inject([EstimationApprovalServiceService], (service: EstimationApprovalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
