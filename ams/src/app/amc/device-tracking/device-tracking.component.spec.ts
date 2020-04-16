import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTrackingComponent } from './device-tracking.component';

describe('DeviceTrackingComponent', () => {
  let component: DeviceTrackingComponent;
  let fixture: ComponentFixture<DeviceTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
