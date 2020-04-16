import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingForDispatchDetailComponent } from './pending-for-dispatch-detail.component';

describe('PendingForDispatchDetailComponent', () => {
  let component: PendingForDispatchDetailComponent;
  let fixture: ComponentFixture<PendingForDispatchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingForDispatchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingForDispatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
