import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInTransitReportComponent } from './device-in-transit-report.component';

describe('DeviceInTransitReportComponent', () => {
  let component: DeviceInTransitReportComponent;
  let fixture: ComponentFixture<DeviceInTransitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInTransitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInTransitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
