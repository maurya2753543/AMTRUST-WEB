import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
// import { DynamicComponentService } from '../services/dynamic-component.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';


describe('AuthGuard', () => {
  let component: AuthGuard;
  let fixture: ComponentFixture<AuthGuard>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let loggedInGuard: AuthGuard;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, CommonModule, HttpModule],
      providers: [ ]
    })
      .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(AuthGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });
});
