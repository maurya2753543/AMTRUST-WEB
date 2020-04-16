import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairInProgressReportComponent } from './repair-in-progress-report.component';

describe('RepairInProgressReportComponent', () => {
  let component: RepairInProgressReportComponent;
  let fixture: ComponentFixture<RepairInProgressReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairInProgressReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairInProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
