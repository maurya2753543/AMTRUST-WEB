import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PendingForDispatchService } from '../../dashboard/service/pending-for-dispatch.service';
import { Subject } from 'rxjs';
import { RepairOrderDetailsComponent } from '../../dashboard/repair-order-details/repair-order-details.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { PendingForDispatchDetailComponent } from '../../dashboard/pending-for-dispatch-detail/pending-for-dispatch-detail.component';
import { PendingForDispatchCaptiveComponent } from '../../dashboard/pending-for-dispatch-captive/pending-for-dispatch-captive.component'
@Component({
  selector: 'app-pending-for-dispatch-report',
  templateUrl: './pending-for-dispatch-report.component.html',
  styleUrls: ['./pending-for-dispatch-report.component.scss']
})
export class PendingForDispatchReportComponent implements OnInit {

  @Input() public set changeEstimationApproval(val: any) {
    if (typeof val != "undefined") {
      this.ngOnInit();
    }


  }
  /*declation of input parameter for dashboard items*/
  @Input() public show: boolean;

  @Output()
  changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();
  uploadInput: any;
  options: any = {};
  deviceResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData: boolean = false;

  constructor(
    public dialog: MatDialog, private pendingForDispatchService: PendingForDispatchService
  ) { }

  ngOnInit() {
    this.getPendingForDispatchDetails();
  }
  getPendingForDispatchDetails() {
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
      "orderState": "Pending for Dispatch",
      "isDetailView": true
    }
    this.pendingForDispatchService.getPendingForDispatch(obj).subscribe(
      (res) => {

        this.deviceResponse = res.response.roList;
        this.dtTrigger.next();
        this.isTableData = true;
      },
      (err) => {

      }
    )

  }


  print(orderId) {
    debugger
    this.pendingForDispatchService.getPDF(orderId).subscribe(
      (res) => {
        debugger;
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

  dispatch(id, logisticsPartner, bookedDateTime,orderState,awbNumber,courierName): void {

    let dialogComponent: any;
    if (logisticsPartner === "captive") {

      dialogComponent = PendingForDispatchCaptiveComponent;
      logisticsPartner = 'Spoors';

    } else if (logisticsPartner === "logicloud") {

      dialogComponent = PendingForDispatchDetailComponent;

    } else {

      dialogComponent = PendingForDispatchCaptiveComponent;
      logisticsPartner = 'LogiCloud';
    }
    let dialogRef = this.dialog.open(dialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        orderId: id,
        logisticsName: logisticsPartner,
        bookedDateTime: bookedDateTime,
        awbNumber:awbNumber,
        message: "dispatchDone",
        courierName:courierName
      }
    });
  }
  downloadData(): void {
    let responseArr = this.deviceResponse, internalArr = [], externalArr = [];


    for (let result of responseArr) {
      internalArr = [];
      internalArr.push(result.claimNo == null||undefined ? 'NA': result.claimNo);
      internalArr.push(result.claimType == null||undefined ? 'NA': result.claimType);
      internalArr.push(result.model == null||undefined ? 'NA': result.model);
      internalArr.push(result.policyHolderName == null||undefined ? 'NA': result.policyHolderName);
      internalArr.push(result.repairCompletionDate == null||undefined ? 'NA': result.repairCompletionDate);
      internalArr.push(result.brand == null||undefined ? 'NA': result.brand);
      internalArr.push(result.imeiNo == null||undefined ? 'NA': "-" + result.imeiNo + "-");
      internalArr.push(result.orderState == null||undefined ? 'NA': result.orderState);
      externalArr.push(internalArr);
    }
    var options = {
      headers: ['Claim No','Claim Type','Model No','Customer Name','Repair Completion Date','Brand Name', 'IMEI No.', 'Status']
    };
    new Angular2Csv(externalArr, 'Pending for Dispatch Report', options);

  }
  getRepairOrderDetails(orderId): void {
    let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
      width: '500px',
      data: { orderID: orderId, message:"dispatchDone"  }
    });
  }


}
