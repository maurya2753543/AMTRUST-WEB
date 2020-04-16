import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingForApprovalAmountComponent } from './pending-for-approval-amount.component';

describe('PendingForApprovalAmountComponent', () => {
  let component: PendingForApprovalAmountComponent;
  let fixture: ComponentFixture<PendingForApprovalAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingForApprovalAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingForApprovalAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
