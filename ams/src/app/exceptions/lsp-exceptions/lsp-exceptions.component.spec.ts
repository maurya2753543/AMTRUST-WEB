import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LspExceptionsComponent } from './lsp-exceptions.component';

describe('LspExceptionsComponent', () => {
  let component: LspExceptionsComponent;
  let fixture: ComponentFixture<LspExceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LspExceptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LspExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
