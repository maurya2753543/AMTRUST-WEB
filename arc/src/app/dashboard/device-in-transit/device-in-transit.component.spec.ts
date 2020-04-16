import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceInTransitComponent } from './device-in-transit.component';

describe('DeviceInTransitComponent', () => {
  let component: DeviceInTransitComponent;
  let fixture: ComponentFixture<DeviceInTransitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInTransitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInTransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
