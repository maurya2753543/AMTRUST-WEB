import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomEstimateApprovalComponent } from './zoom-estimate-approval.component';

describe('ZoomEstimateApprovalComponent', () => {
  let component: ZoomEstimateApprovalComponent;
  let fixture: ComponentFixture<ZoomEstimateApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomEstimateApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomEstimateApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
