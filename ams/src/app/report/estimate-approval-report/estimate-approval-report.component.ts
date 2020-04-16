import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Subject } from 'rxjs';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { EstimationApprovalServiceService } from '../../services/estimation-approval-service.service'
import { RepairOrderDetailsComponent } from '../../amc/repair-order-details/repair-order-details.component'
import { EstimationAmountComponent } from '../../amc/estimation-amount/estimation-amount.component'
@Component({
  selector: 'app-estimate-approval-report',
  templateUrl: './estimate-approval-report.component.html',
  styleUrls: ['./estimate-approval-report.component.scss']
})
export class EstimateApprovalReportComponent  {

  uploadInput : any;
  options : any = {};
  deviceResponse:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData:boolean=false;
  arcId = localStorage.getItem('currentUserArcId');
  
 	constructor(
    public dialog: MatDialog,
	  // public dialogRef: MatDialogRef<EstimateApprovalReportComponent>,
    private estimationApprovalServiceService:EstimationApprovalServiceService
  ) { }

  getApproval() {
    
    let countryId = localStorage.getItem("countryId")
    let countryName;
    if (countryId == "1") {
      countryName = "India"
    }
    else if (countryId == "2") {
      countryName = "Indonesia"
    }else if (countryId == "3") {
      countryName = "Philippines"
    }
    var obj = {     
      "country": countryName,
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
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  downloadData(): void{
    let responseArr = this.deviceResponse, internalArr = [],externalArr = [];
      console.log("responseArr",this.deviceResponse);

    for(let result of responseArr){
      internalArr=[];
      internalArr.push(result.claimNo == null||undefined ? 'NA': result.claimNo);
      internalArr.push(result.claimType == null||undefined ? 'NA': result.claimType);
      internalArr.push(result.claimDate == null||undefined ? 'NA': result.claimDate);
      internalArr.push(result.orderId == null||undefined ? 'NA': result.orderId);
      internalArr.push(result.orderedDate == null||undefined ? 'NA': result.orderedDate);
      internalArr.push(result.arcName == null||undefined ? 'NA': result.arcName);
      internalArr.push(result.brand == null||undefined ? 'NA': result.brand);
      internalArr.push(result.model == null||undefined ? 'NA': result.model);
      internalArr.push(result.imeiNo == null||undefined ? 'NA': "-"+ result.imeiNo+"-");
      internalArr.push(result.estimateDateTime == null||undefined ? 'NA': result.estimateDateTime);
      internalArr.push(result.existingValue == null||undefined ? 'NA': result.existingValue);
      internalArr.push(result.currentmarketValue == null||undefined ? 'NA': result.currentmarketValue);
      internalArr.push(result.availableLiablityLimit == null||undefined ? 'NA': result.availableLiablityLimit);
      internalArr.push(result.totalAmt == null||undefined ? 'NA': result.totalAmt);
      internalArr.push(result.postRepairOrder == null||undefined ? 'NA': result.postRepairOrder);
      internalArr.push(result.comments == null||undefined ? 'NA': result.comments);
      externalArr.push(internalArr);
      
    }
    var options = { 
      headers: ['Claim Id','Claim Type','Claim Date','Repair Order No','Repair Order Date','ARC Name',
      'Device Name','Model No','IMEI No.','Estimation Date','Existing Value','Current Market Value',
      'Available Liability Limit','Online Price','Post Repair Order','Arc Remark']
      };
      new Angular2Csv(externalArr, 'Approval Report',options);    
      
  }

}
