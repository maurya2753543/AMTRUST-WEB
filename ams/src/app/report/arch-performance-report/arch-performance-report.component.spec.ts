import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchPerformanceReportComponent } from './arch-performance-report.component';

describe('ArchPerformanceReportComponent', () => {
  let component: ArchPerformanceReportComponent;
  let fixture: ComponentFixture<ArchPerformanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchPerformanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
