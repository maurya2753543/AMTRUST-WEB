import { TestBed, inject } from '@angular/core/testing';

import { DispatchDeviceServiceService } from './dispatch-device-service.service';

describe('DispatchDeviceServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DispatchDeviceServiceService]
    });
  });

  it('should be created', inject([DispatchDeviceServiceService], (service: DispatchDeviceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
