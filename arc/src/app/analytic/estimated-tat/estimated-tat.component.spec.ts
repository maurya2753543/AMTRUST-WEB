import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedTatComponent } from './estimated-tat.component';

describe('EstimatedTatComponent', () => {
  let component: EstimatedTatComponent;
  let fixture: ComponentFixture<EstimatedTatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatedTatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedTatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
