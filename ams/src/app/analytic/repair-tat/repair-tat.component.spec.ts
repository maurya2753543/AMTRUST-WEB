import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTatComponent } from './repair-tat.component';

describe('RepairTatComponent', () => {
  let component: RepairTatComponent;
  let fixture: ComponentFixture<RepairTatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairTatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairTatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
