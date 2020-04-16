import { Component, OnInit, Input, Output, EventEmitter, trigger, style, transition, animate, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RepairOrderDetailsComponent } from '../repair-order-details/repair-order-details.component';
import { RepairInProgressDoneComponent } from '../repair-in-progress-done/repair-in-progress-done.component';
import { RecievedDeviceReEstimationComponent } from '../recieved-device-reestimation/recieved-device-reestimation.component';
import { ModifyRepairDateComponent } from '../modify-repair-date/modify-repair-date.component'
import { PlannedDateHistoryComponent } from '../planned-date-history/planned-date-history.component'
import { FormControl } from '@angular/forms';
import { SortService } from '../service/table-sort.service';
import { RepairInProgressService } from '../service/repair-in-progress.service';
import { ApprovedSparePartsComponent } from '../approved-spare-parts/approved-spare-parts.component';
@Component({
  selector: 'app-repair-in-progress',
  templateUrl: './repair-in-progress.component.html',
  styleUrls: ['./repair-in-progress.component.scss'],
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
export class RepairInProgressComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(public dialog: MatDialog, private repairInProgressService: RepairInProgressService) { }

  res: any;
  /*declation of input parameter for dashboard items*/
  @Input() public show: boolean;

  @Input() public set changeInRepairInProgress(val: any) {
    if (typeof val != "undefined") {

      this.ngOnInit();
    }
  }

  @Output()
  changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();


  ngOnInit() {
    this.getRepairInProgess();
  }


  viewApprovedPart(item): void {
    let dialogRef = this.dialog.open(ApprovedSparePartsComponent, {
      width: '500px',
      data: { 
        orderId: item.orderId,
        amsComment: item.comment,  }
    });
  }


  getRepairInProgess() {
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
      "orderState": "Repair in Progress",
      "country": countryName,
      "isDetailView": false
    }
    this.repairInProgressService.getRepairInProgress(obj).subscribe(
      (res) => {
        this.res = res;
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
  /**Declearation for show hide panel content */
  isToggle: boolean = true;

  // data = [
  //   { deviceName: 'Samsung 58', imeiNumber: '412438', estimationApprovedOn: '2017-11-17T08:34:32', repairDueDate: '2017-12-01T00:00:00' },
  //   { deviceName: 'Nokia 6', imeiNumber: '412538', estimationApprovedOn: '2018-11-27T08:34:32', repairDueDate: '2018-12-10T00:00:00' },
  // ];


  /**
  *Method for toggle show hide
  */
  toggle() {
    this.isToggle = !this.isToggle;
    this.changeExpansion.emit(this.isToggle);
  }

  /**
  *Done
  */
  done(id): void {
    let dialogRef = this.dialog.open(RepairInProgressDoneComponent, {
      width: '500px',
      //disableClose:true,
      data: { orderId: id, message: "repairComplete" }
    });
  }
  /**
  *reEstimation
  */
  reEstimation(item): void {
    let dialogRef = this.dialog.open(RecievedDeviceReEstimationComponent, {
      width: '800px',
      //disableClose:true,
      data: { orderId: item.orderId, orderEstimateId: item.orderEstimateId, brandId: item.brandId, modelId: item.modelId, crmModel: item.crmModel, message: "reEstimation" }
    });
  }
  modifyRepairDate(id): void {
    let dialogRef = this.dialog.open(ModifyRepairDateComponent, {
      width: '500px',
      //disableClose:true,
      data: { orderId: id, message: "changeinPlanDate" }
    });
  }
  getRepairOrderDetails(orderId): void {
    let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
      width: '500px',
      data: { orderID: orderId }
    });
  }
  getDateHistory(orderId) {
    let dialogRef = this.dialog.open(PlannedDateHistoryComponent, {
      width: '500px',
      //disableClose:true,
      data: { orderId: orderId }
    });
  }
}