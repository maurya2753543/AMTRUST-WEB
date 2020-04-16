import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PendingForAMSService } from '../service/pending-for-AMS.service'
import { asElementData } from '@angular/core/src/view';

@Component({
  selector: 'app-pending-for-approval-amount',
  templateUrl: './pending-for-approval-amount.component.html',
  styleUrls: ['./pending-for-approval-amount.component.scss']
})
export class PendingForApprovalAmountComponent implements OnInit {

  deviceResponse: any;
  deviceResponseHeader: any;
  serviceCharge: any;
  totalAmount: any;
  taxamount: any;
  
  constructor(
    public dialogRef: MatDialogRef<PendingForApprovalAmountComponent>, private pendingForAMSService : PendingForAMSService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
    this.getApprovalAmtData()
  }
  getApprovalAmtData(){

  let id=this.dialogRef._containerInstance._config.data.orderEstimateId;
  let obj ={
    "orderEstimateId":id
  }
  
    this.pendingForAMSService.getEstimationAmountDetails(obj).subscribe(
      (res)=>{
        this.deviceResponseHeader =res.response.estimationDetails;
        this.taxamount = this.deviceResponseHeader.taxValue;
        this.serviceCharge=this.deviceResponseHeader.serviceCharge;
        this.totalAmount=this.deviceResponseHeader.totalAmt;
        this.deviceResponse = res.response.estimationDetails.orderEstimateDtls;
      }
    )
  }
}
