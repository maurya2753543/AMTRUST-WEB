import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedDeviceComponent } from './recieved-device.component';

describe('RecievedDeviceComponent', () => {
  let component: RecievedDeviceComponent;
  let fixture: ComponentFixture<RecievedDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
