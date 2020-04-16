import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInTransitDisputeComponent } from './device-in-transit-dispute.component';

describe('DeviceInTransitDisputeComponent', () => {
  let component: DeviceInTransitDisputeComponent;
  let fixture: ComponentFixture<DeviceInTransitDisputeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInTransitDisputeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInTransitDisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
