import { Component, OnInit, Input, Output, EventEmitter, trigger, style, transition,Inject, animate } from '@angular/core';
import { Sort } from '@angular/material';
import { NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material';
import { RepairOrderDetailsComponent } from '../repair-order-details/repair-order-details.component';
import { EstimationAmountComponent } from '../estimation-amount/estimation-amount.component';
// import { DeviceInTransitDisputeComponent } from '../device-in-transit-dispute/device-in-transit-dispute.component';
import { EstimationApprovalServiceService } from '../../services/estimation-approval-service.service'
import { ZoomEstimateApprovalComponent } from '../zoom-estimate-approval/zoom-estimate-approval.component'
import { AuthService } from '../../services/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-estimation-approval',
  templateUrl: './estimation-approval.component.html',
  styleUrls: ['./estimation-approval.component.scss'],
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
export class EstimationApprovalComponent implements OnInit {

  @Input() public set changeEstimationApproval(val: any) {
    
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
  isApproved: boolean=false;
  res: any;
  deviceResponse: any;
  isLoading: boolean = false;
  sortedData;
  arcId = localStorage.getItem('currentUserArcId');
  
  constructor(private authService: AuthService, private spinnerService: Ng4LoadingSpinnerService,  public dialog: MatDialog, private estimationApprovalServiceService : EstimationApprovalServiceService ) { }

  
  
  ngOnInit() {
    this.getApprovalDetails();
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
  //       case 'claimDate': return this.compareETA(a.claimDate, b.claimDate, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

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
      data: { "orderId": orderId }
    });
  }

  getAmountDetails(orderEstimateId,orderId,comments): void {
    let dialogRef = this.dialog.open(EstimationAmountComponent, {
      width: '700px',
      data: { "orderEstimateId": orderEstimateId,
              "orderId":orderId,
              "comments":comments
      }
    });
  }

  /**
  *Method for toggle show hide
  */
  toggle() {
    this.isToggle = !this.isToggle;
    this.changeExpansion.emit(this.isToggle);
  }

  getApprovalDetails(){
    let currentUser=localStorage.getItem('currentUser');
    let countryId = localStorage.getItem("countryId")
    let countryName;
    if(countryId=="1"){
      countryName="India"
    }
    else if(countryId=="2"){
      countryName="Indonesia"

    }else if(countryId=="3"){
      countryName="Philippines"
    }
    var obj = {
      "orderState":"Pending for Approval",
      "country":countryName,
      "isDetailView":false
    }
   
    this.estimationApprovalServiceService.getPendingForApproval(obj).subscribe(
      (res) => {
        this.isApproved=true;
        
        if(res.responseCode=="200"){
          
          this.deviceResponse = res.responseObj;
          this.spinnerService.hide();
        }
      }
    )

  }
  
}