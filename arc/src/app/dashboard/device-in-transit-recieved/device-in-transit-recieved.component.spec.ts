import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInTransitRecievedComponent } from './device-in-transit-recieved.component';

describe('DeviceInTransitRecievedComponent', () => {
  let component: DeviceInTransitRecievedComponent;
  let fixture: ComponentFixture<DeviceInTransitRecievedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInTransitRecievedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInTransitRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
