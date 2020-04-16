import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostTatComponent } from './cost-tat.component';

describe('CostTatComponent', () => {
  let component: CostTatComponent;
  let fixture: ComponentFixture<CostTatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostTatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostTatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
