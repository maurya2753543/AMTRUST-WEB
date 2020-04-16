import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { DynamicComponentService } from "./services/dynamic-component.service";
import { Router, NavigationEnd } from "@angular/router";
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('dclWrapper', { read: ViewContainerRef })
  dclWrapper: ViewContainerRef;

  @ViewChild('primaryWrapper', { read: ElementRef })
  primaryWrapper: ElementRef;

  constructor( private dyComService: DynamicComponentService, private meta: Meta, public router: Router ) {
    this.meta.addTag({ name: 'description', content: 'AmTrust Repair Portal' });
    this.meta.addTag({ name: 'author', content: 'amTrust' });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    DynamicComponentService.dclWrapper = this.dclWrapper;
    DynamicComponentService.primaryWrapper = this.primaryWrapper;
  }
}