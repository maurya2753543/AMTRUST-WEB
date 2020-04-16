import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDeliveredReportComponent } from './device-delivered-report.component';

describe('DeviceDeliveredReportComponent', () => {
  let component: DeviceDeliveredReportComponent;
  let fixture: ComponentFixture<DeviceDeliveredReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDeliveredReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDeliveredReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
