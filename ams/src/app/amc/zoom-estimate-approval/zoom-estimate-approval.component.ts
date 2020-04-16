import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Subject } from 'rxjs';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { EstimationApprovalServiceService } from '../../services/estimation-approval-service.service'
import { RepairOrderDetailsComponent } from '../repair-order-details/repair-order-details.component';
import { EstimationAmountComponent } from '../estimation-amount/estimation-amount.component'
@Component({
  selector: 'app-zoom-estimate-approval',
  templateUrl: './zoom-estimate-approval.component.html',
  styleUrls: ['./zoom-estimate-approval.component.scss']
})
export class ZoomEstimateApprovalComponent {

  uploadInput : any;
  options : any = {};
  deviceResponse:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData:boolean=false;
  
 	constructor(
    public dialog: MatDialog,
	  public dialogRef: MatDialogRef<ZoomEstimateApprovalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private estimationApprovalServiceService:EstimationApprovalServiceService
  ) { }

  getApproval() {
    var obj = {
      "arcId": "1",
      "country": "India",
      "orderState": "Pending for Approval",
      "isDetailView":true
    }
    this.estimationApprovalServiceService.getPendingForApproval(obj).subscribe(
      (res) => {
        this.deviceResponse = res.responseObj;
        this.dtTrigger.next();
        this.isTableData = true;
      },
      (err) => {

      }
    )
    
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
 }

 ngOnInit() {
  this.getApproval();
}
getAmountDetails(orderEstimateId,orderId): void {
  let dialogRef = this.dialog.open(EstimationAmountComponent, {
    width: '700px',
    data: { "orderEstimateId": orderEstimateId,
            "orderId":orderId
    }
  });
}

getRepairOrderDetails(orderId): void {
  let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
    width: '500px',
    data: { "orderId": orderId }
  });
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  downloadData(): void{
    let responseArr = this.deviceResponse, internalArr = [],externalArr = [];
      console.log("responseArr",this.deviceResponse);

    for(let result of responseArr){
      internalArr=[];
      internalArr.push(result.claimNo);
      internalArr.push(result.claimDate);
      internalArr.push(result.orderId);
      internalArr.push(result.orderedDate);
      internalArr.push(result.arcName);
      internalArr.push(result.brand);
      internalArr.push("-"+ result.imeiNo+"-");
      internalArr.push(result.estimateDateTime);
      internalArr.push(result.existingValue);
      internalArr.push(result.currentmarketValue);
      internalArr.push(result.availableLiablityLimit);
      internalArr.push(result.totalAmt);
      internalArr.push(result.postRepairOrder);
      externalArr.push(internalArr);
      
    }
    var options = { 
      headers: ['Claim Id','Claim Date','Repair Order No','Repair Order Date','ARC Name',
      'Device Name','IMEI No.','Estimation Date','Existing Value','Current Market Value',
      'Available Liability Limit','Online Price','Post Repair Order']
      };
      new Angular2Csv(externalArr, 'Approval Report',options);    
      
  }

}
