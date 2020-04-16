import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingForDispatchReportComponent } from './pending-for-dispatch-report.component';

describe('PendingForDispatchReportComponent', () => {
  let component: PendingForDispatchReportComponent;
  let fixture: ComponentFixture<PendingForDispatchReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingForDispatchReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingForDispatchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
