import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTatComponent } from './pending-tat.component';

describe('PendingTatComponent', () => {
  let component: PendingTatComponent;
  let fixture: ComponentFixture<PendingTatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingTatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
