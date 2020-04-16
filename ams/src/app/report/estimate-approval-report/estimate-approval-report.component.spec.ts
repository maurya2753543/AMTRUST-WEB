import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateApprovalReportComponent } from './estimate-approval-report.component';

describe('EstimateApprovalReportComponent', () => {
  let component: EstimateApprovalReportComponent;
  let fixture: ComponentFixture<EstimateApprovalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateApprovalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateApprovalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
