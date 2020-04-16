import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApprovalDisputedComponent } from './pending-approval-disputed.component';

describe('PendingApprovalDisputedComponent', () => {
  let component: PendingApprovalDisputedComponent;
  let fixture: ComponentFixture<PendingApprovalDisputedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingApprovalDisputedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingApprovalDisputedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
