import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchTatComponent } from './dispatch-tat.component';

describe('DispatchTatComponent', () => {
  let component: DispatchTatComponent;
  let fixture: ComponentFixture<DispatchTatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchTatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchTatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
