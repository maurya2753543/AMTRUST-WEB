import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReportSelectDateComponent } from './client-report-select-date.component';

describe('ClientReportSelectDateComponent', () => {
  let component: ClientReportSelectDateComponent;
  let fixture: ComponentFixture<ClientReportSelectDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientReportSelectDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReportSelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
