import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDispatchedComponent } from './device-dispatched.component';

describe('DeviceDispatchedComponent', () => {
  let component: DeviceDispatchedComponent;
  let fixture: ComponentFixture<DeviceDispatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDispatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDispatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
