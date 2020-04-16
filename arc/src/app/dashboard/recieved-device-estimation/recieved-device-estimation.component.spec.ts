import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedDeviceEstimationComponent } from './recieved-device-estimation.component';

describe('RecievedDeviceEstimationComponent', () => {
  let component: RecievedDeviceEstimationComponent;
  let fixture: ComponentFixture<RecievedDeviceEstimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedDeviceEstimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedDeviceEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
