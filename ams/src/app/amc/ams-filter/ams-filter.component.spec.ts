import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AMSFilterComponent } from './ams-filter.component';

describe('AMSFilterComponent', () => {
  let component: AMSFilterComponent;
  let fixture: ComponentFixture<AMSFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AMSFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AMSFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
