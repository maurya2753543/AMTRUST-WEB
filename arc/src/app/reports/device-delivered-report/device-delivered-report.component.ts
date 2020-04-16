import { Component, OnInit } from '@angular/core';
import { DeviceDelieverdServiceService } from '../../dashboard/service/device-delieverd-service.service'
import { MatDialog } from '@angular/material';
import { DeviceTrackingComponent } from '../../dashboard/device-tracking/device-tracking.component'
import { RepairOrderDetailsComponent } from '../../dashboard/repair-order-details/repair-order-details.component'
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
@Component({
  selector: 'app-device-delivered-report',
  templateUrl: './device-delivered-report.component.html',
  styleUrls: ['./device-delivered-report.component.scss']
})
export class DeviceDeliveredReportComponent implements OnInit {
  currentUser = localStorage.getItem('currentUser');
  isLoading:boolean=false;
  deviceResponse: any;
  isTableData: boolean = false;
  constructor( private deviceDelieverdServiceService : DeviceDelieverdServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getDeviceDeliveredReport();
  }

  getDeviceDeliveredReport(){

    let obj = {
      "arcId": JSON.parse(this.currentUser).arcId,
      "orderState": "Device Delivered"
    }
    this.deviceDelieverdServiceService.getDeviceDeliveredReport(obj).subscribe(
      (res)=>{
        this.deviceResponse = res;
        this.isTableData = true;
      }
    )
  }

  trackAWB(item) {
    let dialogRef = this.dialog.open(DeviceTrackingComponent, {
        width: '500px',
        data: { item: item }
    });
  }

  getRepairOrderDetails(orderId): void {
    console.log("orderId",orderId)
    let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
        width: '500px',
        data: { "orderID": orderId }
    });
  }

  downloadData(): void {
    let responseArr = this.deviceResponse.responseObj, internalArr = [], externalArr = [];
    for (let result of responseArr) {
      debugger;
      internalArr = [];
      internalArr.push(result.claimNo == null||undefined ? 'NA': result.claimNo);
      internalArr.push(result.claimDate == null||undefined ? 'NA': result.claimDate);
      internalArr.push(result.orderId == null||undefined ? 'NA': result.orderId);
      internalArr.push(result.orderedDate == null||undefined ? 'NA': result.orderedDate);
      internalArr.push(result.policyHolderName == null||undefined ? 'NA': result.policyHolderName);
      internalArr.push(result.dispatchedDate == null||undefined ? 'NA': result.dispatchedDate);
      internalArr.push(result.statusDate == null||undefined ? 'NA': result.statusDate);
      internalArr.push(result.arcName == null||undefined ? 'NA': result.arcName);
      internalArr.push(result.brand == null||undefined ? 'NA': result.brand);
      internalArr.push(result.imeiNo == null||undefined ? 'NA': '-'+result.imeiNo+'-');
      internalArr.push(result.awbNo == null||undefined ? 'NA': result.awbNo);
      internalArr.push(result.courierName == null||undefined ? 'NA': result.courierName);
      externalArr.push(internalArr);
    }
    var options = {
      headers: ['Claim Id', 'Claim Date', 'Repair Order No', 'Repair Order Date','Customer Name','Dispatch Date','Delivered to customer date','ARC Name', 'Device Name', 'IMEI No.', 'AWB Number','Logistic Provider']
    };
    new Angular2Csv(externalArr, 'Device Delivered Report', options);

  }
}
