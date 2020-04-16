import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  /*declation of input parameter for dashboard items*/
  @Input() public dashboard: object;
  showReportMenu: boolean = true;
  showInvoiceMenu: boolean = true;
  activeTab: any;
  currentUser: any;
  /*Declaration of output parameter for download file*/
  @Output()
  change: EventEmitter<object> = new EventEmitter<object>();

  constructor() { 
 
  }

  toggle() {
    if (!this.showReportMenu) {
      this.showReportMenu = true;
    } else {
      this.showReportMenu = false;
    }
  }

  toggleInvoice(){
    if (!this.showInvoiceMenu) {
      this.showInvoiceMenu = true;
    } else {
      this.showInvoiceMenu = false;
    }
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  dashboardItemsChanged(): void {
    this.change.emit(this.dashboard);
  }
}
