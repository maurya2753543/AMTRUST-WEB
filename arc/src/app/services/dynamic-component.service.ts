import { Injectable, ViewContainerRef, Type, Component, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class DynamicComponentService {
  static dclWrapper: ViewContainerRef;
  static primaryWrapper: ElementRef;
  constructor(private _http: HttpClient,private _componentFactoryResolver: ComponentFactoryResolver) {}

}