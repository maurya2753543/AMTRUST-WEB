import { Component, OnInit, Input, Output, EventEmitter, trigger, style, transition, animate } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Sort } from '@angular/material';
import { RepairOrderDetailsComponent } from '../repair-order-details/repair-order-details.component';
import { RecievedDeviceEstimationComponent } from '../recieved-device-estimation/recieved-device-estimation.component';
import { DeviceInTransitDisputeComponent } from '../device-in-transit-dispute/device-in-transit-dispute.component';
import { PendingEstimationService } from '../service/pending-estimation.service';
import {DeviceTrackingComponent} from '../../dashboard/device-tracking/device-tracking.component';
@Component({
  selector: 'app-recieved-device',
  templateUrl: './recieved-device.component.html',
  styleUrls: ['./recieved-device.component.scss'],
  animations: [
    trigger(
      'isToggle', [
        transition(':enter', [
          style({ 'height': '0', 'opacity': '0' }),
          animate('200ms linear', style({ 'height': '*', 'opacity': '1' }))
        ]),
        transition(':leave', [
          style({ 'height': '*', 'opacity': '1' }),
          animate('200ms linear', style({ 'height': '0', 'opacity': '0' })
          )])
      ]
    )
  ]
})
export class RecievedDeviceComponent implements OnInit {

  @Input() public set changeInPendingEstimation(val: any) {
    if (typeof val != "undefined") {
      this.ngOnInit();
    }
  }

  /*declation of input parameter for dashboard items*/
  @Input() public show: boolean;

  @Output()
  changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**Declearation for show hide panel content */
  isToggle: boolean = true;
  res: any;
  sortedData;
  isPE: boolean = false;
  constructor(public dialog: MatDialog, private pendingEstimationService: PendingEstimationService) { }

  ngOnInit() {

    this.getPendingEstimation();
    // this.sortedData = this.data;
    // this.sortData({ active: "recievedDate", direction: "asc" });
  }

  trackAWB(item) {
    let dialogRef = this.dialog.open(DeviceTrackingComponent, {
      width: '500px',
      data: { item: item }
    });
  }

  getPendingEstimation() {
    let currentUser = localStorage.getItem('currentUser');
    let countryId = localStorage.getItem("countryId")
    let countryName;
    if (countryId == "1") {
      countryName = "India"
    }
    else if (countryId == "2") {
      countryName = "Indonesia"
    }
    else if(countryId == "3"){
      countryName = "Philippines"
    }
    var obj = {
      "arcId": JSON.parse(currentUser).arcId,
      "orderState": "Pending Estimation",
      "country": countryName
    }

    this.pendingEstimationService.getPendingEstimation(obj).subscribe(
      (res) => {
debugger;
        this.res = res;
        this.isPE = true;
        this.isToggle = !this.isToggle;
        this.changeExpansion.emit(this.isToggle);
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.isToggle = true;
          this.changeExpansion.emit(this.isToggle);
        }, 100);
      },
      (err) => {

      }
    )
  }

  /**
    * Repair Order Details dialog
    */
  getRepairOrderDetails(orderId): void {

    let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
      width: '500px',
      data: { orderID: orderId }
    });
  }

  disputeDevice(orderId): void {
    let dialogRef = this.dialog.open(DeviceInTransitDisputeComponent, {
      width: '500px',
      disableClose: true,
      data: { orderId: orderId, message: "reloadFromPE" }
    });
  }
  /**
   * Estimation
   */
  estimation(item): void {
    let dialogRef = this.dialog.open(RecievedDeviceEstimationComponent, {
      width: '800px',
      disableClose: true,
      data: { 
        orderId: item.orderId, 
        brandId: item.brandId, 
        modelId: item.modelId, 
        crmModel:item.model, 
        message: "reloadFromPE" }
    });
  }
  // sortData(sort: Sort) {
  //   const data = this.data.slice();
  //   if (!sort.active || sort.direction == '') {
  //     this.sortedData = data;
  //     return;
  //   }
  //   this.sortedData = data.sort((a, b) => {
  //     let isAsc = sort.direction == 'asc';
  //     switch (sort.active) {
  //       case 'recievedDate': return this.compareETA(a.recievedDate, b.recievedDate, isAsc);
  //       case 'estimationDueDate': return this.compareETA(a.estimationDueDate, b.estimationDueDate, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }


  /**
   * Sort Data with recievedDate header
   * @param a 
   * @param b 
   * @param isAsc 
   */
  compareETA(a, b, isAsc) {
    return (((new Date(a)).getTime() < (new Date(b)).getTime()) ? -1 : 1) * (isAsc ? 1 : -1);
  }


  /**
  *Method for toggle show hide
  */
  toggle() {
    this.isToggle = !this.isToggle;
    this.changeExpansion.emit(this.isToggle);
  }
}
