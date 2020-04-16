import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RepairInProgressService } from '../../dashboard/service/repair-in-progress.service';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { RepairOrderDetailsComponent } from '../../dashboard/repair-order-details/repair-order-details.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RepairInProgressDoneComponent } from '../../dashboard/repair-in-progress-done/repair-in-progress-done.component';
import { RecievedDeviceReEstimationComponent } from '../../dashboard/recieved-device-reestimation/recieved-device-reestimation.component';
import { MessageService } from '../../dashboard/service/message.service';

@Component({
  selector: 'app-repair-in-progress-report',
  templateUrl: './repair-in-progress-report.component.html',
  styleUrls: ['./repair-in-progress-report.component.scss']
})
export class RepairInProgressReportComponent {
  uploadInput: any;
  options: any = {};
  deviceResponse: any;
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData: boolean = false;
  repairInProgressRes: any;

  constructor(
    public dialog: MatDialog,
    private repairInProgressService: RepairInProgressService, private messageService: MessageService
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.ngOnInit();
    });
  }

  getRepairInProgess() {
    this.isTableData = false;
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
      "isDetailView": true
    }

    this.repairInProgressService.getRepairInProgress(obj).subscribe(
      (res) => {
        this.repairInProgressRes = res;
        this.isTableData = true;
        document.getElementById("myTable").style.display = "block";
        this.dtTrigger.next()

      },
      (err) => {

      }
    )
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  ngOnInit() {
    this.getRepairInProgess();
  }

  downloadData(): void {
    let responseArr = this.repairInProgressRes, internalArr = [], externalArr = [];
    for (let result of responseArr.response.roList) {
      internalArr = [];
      internalArr.push(result.claimNo == null||undefined ? 'NA': result.claimNo);
      internalArr.push(result.claimType == null||undefined ? 'NA': result.claimType);
      internalArr.push(result.policyHolderName == null||undefined ? 'NA': result.policyHolderName);
      internalArr.push(result.brand == null||undefined ? 'NA': result.brand)
      internalArr.push(result.model == null||undefined ? 'NA': result.model );
      internalArr.push(result.imeiNo == null||undefined ? 'NA': "-" + result.imeiNo + "-");
      internalArr.push(result.totalAmt == null||undefined ? 'NA': result.totalAmt);
      internalArr.push(result.approvedAmount == null||undefined ? 'NA': result.approvedAmount);
      internalArr.push(result.estimationApprovedDate == null||undefined ? 'NA': result.estimationApprovedDate);
      internalArr.push(result.repairDueDate == null||undefined ? 'NA': result.repairDueDate);
      internalArr.push(result.repairPlannedDate == null||undefined ? 'NA': result.repairPlannedDate);
      internalArr.push(result.amsComment == null||undefined ? 'NA': result.amsComment);
      externalArr.push(internalArr);
    }
    var options = {
      headers: ['Claim No','Claim Type','Customer Name','Brand Name','Model', 'IMEI No.','Estimate Amount', 'Approved Amount','Estimation Approved Date', 'Repair Due Date', 'Repair Planned Date','Ams Remarks']
    };
    new Angular2Csv(externalArr, 'Repair in Pregress Report', options);

  }
  /**
*Done
*/
  done(id): void {
    let dialogRef = this.dialog.open(RepairInProgressDoneComponent, {
      width: '500px',
      //disableClose:true,
      data: { orderId: id, message: "repairCompleteReport" }
    });
  }
  /**
  *reEstimation
  */
  reEstimation(item): void {
    let dialogRef = this.dialog.open(RecievedDeviceReEstimationComponent, {
      width: '700px',
      //disableClose:true,
      data: { orderId: item.orderId, brandId: item.brandId, modelId: item.modelId, message: "reloadFromPE" }
    });
  }

  getRepairOrderDetails(orderId): void {
    let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
      width: '500px',
      data: { orderID: orderId }
    });
  }

}
