import { TestBed, inject } from '@angular/core/testing';

import { ClientReportDataService } from './client-report-data.service';

describe('ClientReportDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientReportDataService]
    });
  });

  it('should be created', inject([ClientReportDataService], (service: ClientReportDataService) => {
    expect(service).toBeTruthy();
  }));
});
