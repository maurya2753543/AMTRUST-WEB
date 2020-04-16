import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRepairDateComponent } from './modify-repair-date.component';

describe('ModifyRepairDateComponent', () => {
  let component: ModifyRepairDateComponent;
  let fixture: ComponentFixture<ModifyRepairDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyRepairDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRepairDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
