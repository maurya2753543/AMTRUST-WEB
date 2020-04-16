import { Component, OnInit,Inject, Input, Output, EventEmitter, trigger, style, transition, animate } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeviceDispatchedService } from '../service/device-dispatched.service';
import {DeviceTrackingComponent} from '../device-tracking/device-tracking.component';
import {PendingForDispatchService} from '../service/pending-for-dispatch.service';
@Component({
  selector: 'app-device-dispatched',
  templateUrl: './device-dispatched.component.html',
  styleUrls: ['./device-dispatched.component.scss'],
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
    )]
})
export class DeviceDispatchedComponent implements OnInit {

  /*declation of input parameter for dashboard items*/
  @Input() public show: boolean;

  @Input() public set changeInPendingForDispatch(val: any) {
		if (typeof val != "undefined") {
			this.ngOnInit();
		}
	}


  @Output()
  changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**Declearation for show hide panel content */
  isToggle: boolean = true;
  res:any;

  constructor(private deviceDispatchedService: DeviceDispatchedService,public dialog: MatDialog,private pendingForDispatchService:PendingForDispatchService) { }

  ngOnInit() {
    this.getDeviceDispatched();
  }

  trackAWB(item) {
    let dialogRef = this.dialog.open(DeviceTrackingComponent, {
      width: '500px',
      data: { item: item }
    });
  }

  getDeviceDispatched() {
    let currentUser=localStorage.getItem('currentUser');
    let countryId = localStorage.getItem("countryId")
    let countryName;
    if(countryId=="1"){
      countryName="India"
    }
    else if(countryId=="2"){
      countryName="Indonesia"
    }
    else if(countryId=="3"){
      countryName="Philippines"
    }
    var obj = {
      "arcId": JSON.parse(currentUser).arcId,
      "orderState": "Device Dispatched",
      "country": countryName
    }
    this.deviceDispatchedService.getDeviceDispatched(obj).subscribe(
      (res) => {
       
        this.res = res;
        this.isToggle = !this.isToggle;
        this.changeExpansion.emit(this.isToggle);
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.isToggle = true;
          this.changeExpansion.emit(this.isToggle);
        }, 1000);
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

  print(orderId) {
    debugger
    this.pendingForDispatchService.getPDF(orderId).subscribe(
      (res) => {
        debugger;
        var file = new Blob([res], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        var printWindow = window.open(fileURL);
        printWindow.focus();
        printWindow.print();
      },
      (err) => {

      }
    )
  }

  getIsDate(date) {
    if (new Date(date) < new Date()) {
      return true;
    }
  }
}
