import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PendingForAMSService } from '../../dashboard/service/pending-for-AMS.service';
import { Subject } from 'rxjs';
import { RepairOrderDetailsComponent } from '../../dashboard/repair-order-details/repair-order-details.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import {PendingForApprovalAmountComponent} from '../../dashboard/pending-for-approval-amount/pending-for-approval-amount.component';
@Component({
  selector: 'app-pending-for-ams-report',
  templateUrl: './pending-for-ams-report.component.html',
  styleUrls: ['./pending-for-ams-report.component.scss']
})
export class PendingForAmsReportComponent {

 
  uploadInput : any;
	options : any = {};
  deviceResponse:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData:boolean=false;
  
 	constructor(
    public dialog: MatDialog,private pendingForAMSService:PendingForAMSService
  ) { }

  getPendingForApproval() {
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
      "country": countryName,
      "orderState": "Pending for Approval",
      "isDetailView":true
    }
    this.pendingForAMSService.getPendingForAMS(obj).subscribe(
      (res) => {
      
        this.deviceResponse = res.response.roList;
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
  this.getPendingForApproval();
}

  downloadData(): void{
    let responseArr = this.deviceResponse, internalArr = [],externalArr = [];

    for( let result of responseArr ){
      internalArr=[];
      internalArr.push(result.brand== null||undefined ? 'NA': result.brand);
      internalArr.push("-"+result.imeiNo+"-");
      internalArr.push(result.estimationDate == null||undefined ? 'NA': result.estimationDate);
      internalArr.push(result.estimatedBy== null||undefined ? 'NA': result.estimatedBy);
      internalArr.push(result.amount== null||undefined ? 'NA': result.amount);
      internalArr.push(result.approvalDueDate== null||undefined ? 'NA': result.approvalDueDate);
      externalArr.push(internalArr);
    }
    var options = { 
   headers: ['Brand Name','IMEI No.','Estimation Date','Estimation By','Amount','Approval Due Date/Time']
      };
      new Angular2Csv(externalArr, 'Pending for Approval Report',options);
      
     
}
 /**
  *Amount Detail 
  */
 amount(orderEstimateId): void {
  let dialogRef = this.dialog.open(PendingForApprovalAmountComponent, {
    width: '500px',
    //disableClose:true,
    data: { orderEstimateId: orderEstimateId }
  });
}
getRepairOrderDetails(orderId): void {
  let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
    width: '500px',
    data: { orderID: orderId }
  });
}

}
