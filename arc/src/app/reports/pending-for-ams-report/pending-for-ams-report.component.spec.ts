import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingForAmsReportComponent } from './pending-for-ams-report.component';

describe('PendingForAmsReportComponent', () => {
  let component: PendingForAmsReportComponent;
  let fixture: ComponentFixture<PendingForAmsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingForAmsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingForAmsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
