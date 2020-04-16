import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedDetailComponent } from './estimated-detail.component';

describe('EstimatedDetailComponent', () => {
  let component: EstimatedDetailComponent;
  let fixture: ComponentFixture<EstimatedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
