import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDispatchedReportComponent } from './device-dispatched-report.component';

describe('DeviceDispatchedReportComponent', () => {
  let component: DeviceDispatchedReportComponent;
  let fixture: ComponentFixture<DeviceDispatchedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDispatchedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDispatchedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
