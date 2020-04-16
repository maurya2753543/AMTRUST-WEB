import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeviceDispatchedService } from '../../dashboard/service/device-dispatched.service';
import { Subject } from 'rxjs';
import { RepairOrderDetailsComponent } from '../../dashboard/repair-order-details/repair-order-details.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RecievedDeviceEstimationComponent } from '../../dashboard/recieved-device-estimation/recieved-device-estimation.component'
import { DeviceInTransitDisputeComponent } from '../../dashboard/device-in-transit-dispute/device-in-transit-dispute.component';
import {PendingForDispatchService} from '../../dashboard/service/pending-for-dispatch.service';
import {DeviceTrackingComponent} from '../../dashboard/device-tracking/device-tracking.component';

@Component({
  selector: 'app-device-dispatched-report',
  templateUrl: './device-dispatched-report.component.html',
  styleUrls: ['./device-dispatched-report.component.scss']
})
export class DeviceDispatchedReportComponent {

  uploadInput: any;
  options: any = {};
  deviceResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData: boolean = false;

  constructor(
    public dialog: MatDialog,
    private deviceDispatchedService: DeviceDispatchedService,
    private pendingForDispatchService:PendingForDispatchService) { }

  getDeviceDispatched() {
    let currentUser = localStorage.getItem('currentUser');
    let countryId = localStorage.getItem("countryId")
    let countryName;
    if (countryId == "1") {
      countryName = "India"
    }
    else if (countryId == "2") {
      countryName = "Indonesia"
    }
    else if (countryId == "3"){
      countryName = "Philippines"
    }
    var obj = {
      "arcId": JSON.parse(currentUser).arcId,
      "country": countryName,
      "orderState": "Device Dispatched",
      "isDetailView": "true"
    }

    this.deviceDispatchedService.getDeviceDispatched(obj).subscribe(
      (res) => {
         
        this.deviceResponse = res;
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
    this.getDeviceDispatched();
  }


  trackAWB(item) {
    let dialogRef = this.dialog.open(DeviceTrackingComponent, {
      width: '500px',
      data: { item: item }
    });
  }

  estimation(orderId): void {
    let dialogRef = this.dialog.open(RecievedDeviceEstimationComponent, {
      width: '700px',
      disableClose: true,
      data: { orderId: orderId }
    });
  }

  disputeDevice(orderId): void {
    let dialogRef = this.dialog.open(DeviceInTransitDisputeComponent, {
      width: '500px',
      disableClose: true,
      data: { orderId: orderId }
    });
  }

  print(orderId) {
    this.pendingForDispatchService.getPDF(orderId).subscribe(
      (res) => {
        var file = new Blob([res], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        var printWindow = window.open(fileURL);
        printWindow.focus();
        printWindow.print();
      },
      (err) => {

      }
    )
  }

  downloadData(): void {
    let responseArr = this.deviceResponse, internalArr = [], externalArr = [];
    
    for (let result of responseArr.response.roList) {
      internalArr = [];
      internalArr.push(result.claimNo == null||undefined ? 'NA': result.claimNo);
      internalArr.push(result.claimType == null||undefined ? 'NA': result.claimType);
      internalArr.push(result.policyHolderName == null||undefined ? 'NA': result.policyHolderName);
      internalArr.push(result.awbNo == null||undefined ? 'NA': result.awbNo);
      internalArr.push(result.brand == null||undefined ? 'NA': result.brand);
      internalArr.push(result.model == null||undefined ? 'NA': result.model);
      internalArr.push(result.courierName == null||undefined ? 'NA': result.courierName);
      internalArr.push(result.eta == null||undefined ? 'NA': result.eta);
      internalArr.push(result.orderState == null||undefined ? 'NA': result.orderState);
      externalArr.push(internalArr);
    }
    var options = {
      headers: ['Claim No','Claim Type','Customer Name','AWB No.','Brand','Model','Courier Name', 'Dispatched Date',  'Delivery Status']
    };
    new Angular2Csv(externalArr, 'Device Dispatched Report', options);

  }
  getRepairOrderDetails(orderId): void {
    let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
      width: '500px',
      data: { orderID: orderId }
    });
  }

}
