import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingEstimationReportComponent } from './pending-estimation-report.component';

describe('PendingEstimationReportComponent', () => {
  let component: PendingEstimationReportComponent;
  let fixture: ComponentFixture<PendingEstimationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingEstimationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingEstimationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
