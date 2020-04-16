import { Injectable, ViewContainerRef, Type, Component, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DynamicComponentService {
  static dclWrapper: ViewContainerRef;
  static primaryWrapper: ElementRef;
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}
}