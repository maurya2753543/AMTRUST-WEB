import { Component, OnInit, Input, Output, EventEmitter, trigger, style, transition, animate } from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { RepairOrderDetailsComponent } from '../repair-order-details/repair-order-details.component';
import { PendingForApprovalAmountComponent } from '../pending-for-approval-amount/pending-for-approval-amount.component';
import { PendingForAMSService } from '../service/pending-for-AMS.service';
import { PendingApprovalDisputedComponent } from '../pending-approval-disputed/pending-approval-disputed.component';
@Component({
  selector: 'app-pending-for-approval',
  templateUrl: './pending-for-approval.component.html',
  styleUrls: ['./pending-for-approval.component.scss'],
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
export class PendingForApprovalComponent implements OnInit {

  /*declation of input parameter for dashboard items*/
  @Input() public show: boolean;

  @Output()
  changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

  
  @Input() public set changeInPendingForApproval(val: any) {
		if (typeof val != "undefined") {
			this.ngOnInit();
		}
	}
  /**Declearation for show hide panel content */
  isToggle: boolean = true;

  data = [
    { deviceName: 'Samsung 58', imeiNumber: '412438', approvalDate: '2017-12-25T08:34:32', estimatedBy: 'Manoj Kumar', estimationDate: '2017-12-01T00:00:00', amount: 1500 },
    { deviceName: 'Nokia 6', imeiNumber: '412538', approvalDate: '2018-12-20T08:34:32', estimatedBy: 'Atul Singh', estimationDate: '2018-12-10T00:00:00', amount: 1850 },
  ];

  sortedData;
  res: any;

  constructor(public dialog: MatDialog, private pendingForAMSService: PendingForAMSService) { }

  ngOnInit() {
    // this.sortedData = this.data;
    // this.sortData({ active: "recievedDate", direction: "asc" });
    this.getPendingForAMS();
  }

  getPendingForAMS() {
    let currentUser=localStorage.getItem('currentUser');
    let countryId = localStorage.getItem("countryId")
    let countryName;
    if(countryId=="1"){
      countryName="India"
    }
    else if(countryId=="2"){
      countryName="Indonesia"
    }
    else if(countryId == "3"){
      countryName = "Philippines"
    }
    var obj = {
      "arcId": JSON.parse(currentUser).arcId,
      "orderState": "Pending for Approval",
      "country": countryName
    }
    this.pendingForAMSService.getPendingForAMS(obj).subscribe(
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

 
  sortData(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'estimationDate': return this.compareETA(a.estimationDate, b.estimationDate, isAsc);
        case 'approvalDate': return this.compareETA(a.estimationDate, b.estimationDate, isAsc);
        case 'amount': return this.compareAmount(a.estimationDate, b.estimationDate, isAsc);
        default: return 0;
      }
    });
  }

  /**
   * Sort Data with recievedDate header
   * @param a 
   * @param b 
   * @param isAsc 
   */
  compareETA(a, b, isAsc) {
    return (((new Date(a)).getTime() < (new Date(b)).getTime()) ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareAmount(a, b, isAsc) {
    return ((a - b) ? -1 : 1) * (isAsc ? 1 : -1);
  }

  /**
  *Method for toggle show hide
  */
  toggle() {
    this.isToggle = !this.isToggle;
    this.changeExpansion.emit(this.isToggle);
  }

  /**
  *Action Details
  */
 actionDetails(action,orderEstimateId,orderID): void{
   console.log("orderid",orderID);
  if(action=="Pending for Approval"){
    let dialogRef = this.dialog.open(PendingForApprovalAmountComponent, {
      width: '500px',
      //disableClose:true,
      data: { orderEstimateId: orderEstimateId }
    });
  }else{
    let dialogRef = this.dialog.open(PendingApprovalDisputedComponent,{
      width: '700px',
      data: { orderID: orderID }
    })
  }
 }
  // amount(orderEstimateId): void {
  //   let dialogRef = this.dialog.open(PendingForApprovalAmountComponent, {
  //     width: '500px',
  //     //disableClose:true,
  //     data: { orderEstimateId: orderEstimateId }
  //   });
  // }


  getIsDate(date) {
    if (new Date(date) < new Date()) {
      return true;
    }
  }

  getRepairOrderDetails(orderId): void {
    let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
      width: '500px',
      data: { orderID: orderId }
    });
  }
}