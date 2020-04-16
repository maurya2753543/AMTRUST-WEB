import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedDateHistoryComponent } from './planned-date-history.component';

describe('PlannedDateHistoryComponent', () => {
  let component: PlannedDateHistoryComponent;
  let fixture: ComponentFixture<PlannedDateHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedDateHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedDateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
