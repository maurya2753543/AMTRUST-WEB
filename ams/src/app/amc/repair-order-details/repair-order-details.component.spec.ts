import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairOrderDetailsComponent } from './repair-order-details.component';

describe('RepairOrderDetailsComponent', () => {
  let component: RepairOrderDetailsComponent;
  let fixture: ComponentFixture<RepairOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
