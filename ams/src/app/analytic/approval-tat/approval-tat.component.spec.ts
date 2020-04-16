import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalTatComponent } from './approval-tat.component';

describe('ApprovalTatComponent', () => {
  let component: ApprovalTatComponent;
  let fixture: ComponentFixture<ApprovalTatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalTatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalTatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
