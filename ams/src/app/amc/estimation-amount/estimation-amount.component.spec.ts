import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationAmountComponent } from './estimation-amount.component';

describe('EstimationAmountComponent', () => {
  let component: EstimationAmountComponent;
  let fixture: ComponentFixture<EstimationAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimationAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
