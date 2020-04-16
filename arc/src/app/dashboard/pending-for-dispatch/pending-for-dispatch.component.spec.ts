import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingForDispatchComponent } from './pending-for-dispatch.component';

describe('PendingForDispatchComponent', () => {
  let component: PendingForDispatchComponent;
  let fixture: ComponentFixture<PendingForDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingForDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingForDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
