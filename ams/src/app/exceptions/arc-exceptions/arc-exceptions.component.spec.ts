import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcExceptionsComponent } from './arc-exceptions.component';

describe('ArcExceptionsComponent', () => {
  let component: ArcExceptionsComponent;
  let fixture: ComponentFixture<ArcExceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcExceptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
