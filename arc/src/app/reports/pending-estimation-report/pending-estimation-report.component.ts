import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { PendingEstimationService } from '../../dashboard/service/pending-estimation.service';
import { Subject } from 'rxjs';
import { RepairOrderDetailsComponent } from '../../dashboard/repair-order-details/repair-order-details.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RecievedDeviceEstimationComponent } from '../../dashboard/recieved-device-estimation/recieved-device-estimation.component'
import { DeviceInTransitDisputeComponent } from '../../dashboard/device-in-transit-dispute/device-in-transit-dispute.component';
import { MessageService } from '../../dashboard/service/message.service';
import {DeviceTrackingComponent} from '../../dashboard/device-tracking/device-tracking.component';
@Component({
  selector: 'app-pending-estimation-report',
  templateUrl: './pending-estimation-report.component.html',
  styleUrls: ['./pending-estimation-report.component.scss']
})
export class PendingEstimationReportComponent {

  uploadInput: any;
  options: any = {};
  deviceResponse: any;
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData: boolean = false;
  message: any;
  reloadPendingEstimationReport = { value: false }

  constructor(
    public dialog: MatDialog, private pendingEstimationService: PendingEstimationService, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.ngOnInit();
    });
  }

  trackAWB(item) {
    let dialogRef = this.dialog.open(DeviceTrackingComponent, {
      width: '500px',
      data: { item: item }
    });
  }

  getPendingEstimation() {
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
      "country": countryName,
      "orderState": "Pending Estimation",
      "isDetailView": "true"
    }

    this.pendingEstimationService.getPendingEstimation(obj).subscribe(
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
    this.getPendingEstimation();
  }

  estimation(item): void {
    let dialogRef = this.dialog.open(RecievedDeviceEstimationComponent, {
      width: '700px',
      disableClose: true,
      data: { orderId: item.orderId, brandId: item.brandId, modelId: item.modelId,crmModel:item.crmModel, message: "reloadFromPE" }
    });
  }

  disputeDevice(orderId): void {
    let dialogRef = this.dialog.open(DeviceInTransitDisputeComponent, {
      width: '500px',
      disableClose: true,
      data: { orderId: orderId, message: "reloadFromPEReport" }
    });
  }

  downloadData(): void {
    let responseArr = this.deviceResponse, internalArr = [], externalArr = [];

    for (let result of responseArr) {
      internalArr = [];
      internalArr.push(result.claimNo == null||undefined ? 'NA': result.claimNo);
      internalArr.push(result.claimType == null||undefined ? 'NA': result.claimType);
      internalArr.push(result.brand == null||undefined ? 'NA': result.brand);
      internalArr.push(result.model == null||undefined ? 'NA': result.model);
      internalArr.push(result.policyHolderName == null||undefined ? 'NA': result.policyHolderName);
      internalArr.push(result.imeiNo == null||undefined ? 'NA': "-" + result.imeiNo + "-");
      internalArr.push(result.receivedDateTime == null||undefined ? 'NA': result.receivedDateTime);
      internalArr.push(result.estimationDueDate == null||undefined ? 'NA': result.estimationDueDate);
      externalArr.push(internalArr);
    }
    var options = {
      headers: ['Claim No','Claim Type','Brand Name','Model No','Customer Name', 'IMEI No.', 'Received Date Time', 'Estimation Due Date']
    };
    new Angular2Csv(externalArr, 'Pending Estimation Report', options);

  }
  getRepairOrderDetails(orderId): void {
    let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
      width: '500px',
      data: { orderID: orderId }
    });
  }

}
