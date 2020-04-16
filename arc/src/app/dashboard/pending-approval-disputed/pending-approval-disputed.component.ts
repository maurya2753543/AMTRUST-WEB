import { Component, OnInit, Inject } from '@angular/core';
import { PendingForAMSService } from '../service/pending-for-AMS.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RepairOrderDetailsComponent } from '../repair-order-details/repair-order-details.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-pending-approval-disputed',
  templateUrl: './pending-approval-disputed.component.html',
  styleUrls: ['./pending-approval-disputed.component.scss']
})
export class PendingApprovalDisputedComponent implements OnInit {
response:any;
disputeType:any;
comments:any;
disputedBy:any;
  constructor( public dialog: MatDialog,public dialogRef: MatDialogRef<PendingApprovalDisputedComponent>, private pendingForAMSService : PendingForAMSService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getDetails();
  }
  
  getDetails(){
    let id=this.dialogRef._containerInstance._config.data.orderID;
    console.log(id);
    let obj ={
      "orderId":id
    }
    this.pendingForAMSService.getDisputedDetails(obj).subscribe(
      (res)=>{
        console.log("response",res);
        this.response = res.response.disputeDetails.repairOrder;
        this.disputeType = res.response.disputeDetails.disputeType;
        this.comments = res.response.disputeDetails.comments;
        this.disputedBy = res.response.disputeDetails.lastUpdatedBy;
      }
    )
  }

  // getRepairOrderDetails(orderId): void {
  //   let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
  //     width: '500px',
  //     data: { orderID: orderId }
  //   });
  // }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
