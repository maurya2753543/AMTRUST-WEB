import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedDeviceReEstimationComponent } from './recieved-device-reestimation.component';

describe('RecievedDeviceEstimationComponent', () => {
  let component: RecievedDeviceReEstimationComponent;
  let fixture: ComponentFixture<RecievedDeviceReEstimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedDeviceReEstimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedDeviceReEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
