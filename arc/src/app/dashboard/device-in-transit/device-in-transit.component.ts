import { Component, OnInit, Input, Output, EventEmitter, trigger, style, transition, animate } from '@angular/core';
import { Sort } from '@angular/material';
import { NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material';
import { RepairOrderDetailsComponent } from '../repair-order-details/repair-order-details.component';
import { DeviceInTransitRecievedComponent } from '../device-in-transit-recieved/device-in-transit-recieved.component';
import { DeviceInTransitService } from '../service/device-in-transit.service';
import {DeviceTrackingComponent} from '../device-tracking/device-tracking.component';
@Component({
  selector: 'app-device-in-transit',
  templateUrl: './device-in-transit.component.html',
  styleUrls: ['./device-in-transit.component.scss'],
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
export class DeviceInTransitComponent implements OnInit {

  @Input() public set changeInDeviceTransit(val: any) {
    if (typeof val != "undefined") {
      this.ngOnInit();
    }
  }

  /*declation of input parameter for dashboard items*/
  @Input() public show: boolean;

  @Output()
  changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() deviceReceived = new EventEmitter();

  /**Declearation for show hide panel content */
  isToggle: boolean = true;
  deviceResponse: any;
  logisticsPartner:any;
  isDIT: boolean = false;
  sortedData;
  isLoading: boolean = false;
  constructor(public dialog: MatDialog, private deviceInTransitService: DeviceInTransitService) { }

  ngOnInit() {
    this.getDevicesInTransit();
  }
  trackAWB(item) {
    let dialogRef = this.dialog.open(DeviceTrackingComponent, {
      width: '500px',
      data: { item: item }
    });
  }

  getDevicesInTransit() {
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
      "country": countryName,
      "orderState": "Device in Transit",
      "isDetailView": false
    }
    this.deviceInTransitService.getDeviceInTransit(obj).subscribe(
      (res) => {
         
        this.isDIT = true;
         
        // this.logisticsPartner = res.response.roList.logisticsPartner;
        // this.logisticsPartner = "logicloud";
        // for(let i =0; i<res.response.roList.length[0]; i++)
        // {

        // }
        this.deviceResponse = res.response.roList;
        this.sortedData = this.deviceResponse;
        this.isToggle = !this.isToggle;
        this.changeExpansion.emit(this.isToggle);
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.isToggle = true;
          this.changeExpansion.emit(this.isToggle);
        }, 100);

        this.sortData({ active: "eta", direction: "asc" });
      },
      (err) => {

      }
    )
  }

  sortData(sort: Sort) {
    const data = this.deviceResponse.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'eta': return this.compareETA(a.eta, b.eta, isAsc);
        default: return 0;
      }
    });
  }

  /**
   * Sort Data with ETA header
   * @param a 
   * @param b 
   * @param isAsc 
   */
  compareETA(a, b, isAsc) {
    return (((new Date(a)).getTime() < (new Date(b)).getTime()) ? -1 : 1) * (isAsc ? 1 : -1);
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

  /**
   * Received device
   */

  receivedDevice(orderId): void {

    this.deviceInTransitService.deviceReceived(orderId).subscribe(
      (res) => {
        this.deviceReceived.emit();
      },
      (err) => {
      }
    )
  }


  /**
  *Method for toggle show hide
  */
  toggle() {
    this.isToggle = !this.isToggle;
    this.changeExpansion.emit(this.isToggle);
  }

}
