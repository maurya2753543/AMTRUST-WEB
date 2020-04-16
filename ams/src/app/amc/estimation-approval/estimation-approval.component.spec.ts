import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EstimationApprovalComponent } from './estimation-approval.component';

describe('EstimationApprovalComponent', () => {
  let component: EstimationApprovalComponent;
  let fixture: ComponentFixture<EstimationApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimationApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
