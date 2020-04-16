import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingForDispatchCaptiveComponent } from './pending-for-dispatch-captive.component';

describe('PendingForDispatchCaptiveComponent', () => {
  let component: PendingForDispatchCaptiveComponent;
  let fixture: ComponentFixture<PendingForDispatchCaptiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingForDispatchCaptiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingForDispatchCaptiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
