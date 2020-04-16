import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedSparePartsComponent } from './approved-spare-parts.component';

describe('ApprovedSparePartsComponent', () => {
  let component: ApprovedSparePartsComponent;
  let fixture: ComponentFixture<ApprovedSparePartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedSparePartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedSparePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
