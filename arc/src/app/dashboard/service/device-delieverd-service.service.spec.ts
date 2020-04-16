import { TestBed, inject } from '@angular/core/testing';

import { DeviceDelieverdServiceService } from './device-delieverd-service.service';

describe('DeviceDelieverdServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDelieverdServiceService]
    });
  });

  it('should be created', inject([DeviceDelieverdServiceService], (service: DeviceDelieverdServiceService) => {
    expect(service).toBeTruthy();
  }));
});
