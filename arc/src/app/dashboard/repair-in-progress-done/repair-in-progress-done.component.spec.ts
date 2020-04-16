import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairInProgressDoneComponent } from './repair-in-progress-done.component';

describe('RepairInProgressDoneComponent', () => {
  let component: RepairInProgressDoneComponent;
  let fixture: ComponentFixture<RepairInProgressDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairInProgressDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairInProgressDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
