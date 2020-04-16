import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { AnalyticService } from '../analytic.service';

@Component({
  selector: 'app-approval-detail',
  templateUrl: './approval-detail.component.html',
  styleUrls: ['./approval-detail.component.scss']
})
export class ApprovalDetailComponent implements OnInit {
  uploadInput: any;
  options: any = {};
  deviceResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData: boolean = false;
  approvalTATDetailRes: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ApprovalDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private analyticService: AnalyticService) { }

    getApprovalDetail() {
    let obj = this.dialogRef._containerInstance._config.data.obj;
    this.analyticService.getApprovalTATDetails(obj).subscribe(
      (res) => {

        this.approvalTATDetailRes = res.responseObj;
        this.isTableData = true;
        this.dtTrigger.next();
      },
      (err) => {

      }
    )
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  ngOnInit() {
    this.getApprovalDetail();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  downloadData(): void {
    let responseArr = this.approvalTATDetailRes, internalArr = [], externalArr = [];

    for (let result of responseArr) {
      internalArr = [];
      internalArr.push(result.orderId);
      internalArr.push(result.repairDate);
      internalArr.push(result.brand + " " + result.model);
      internalArr.push(result.imeiNo);
      internalArr.push(result.receivedDate);
      internalArr.push(result.approvalDate);
      internalArr.push(result.estimationDate);
      internalArr.push(result.postRepair);
      externalArr.push(internalArr);
    }
    var options = {
      headers: ['Repair Order No.', 'Repair Order Date', 'Device Name', 'IMEI No.','Received Date','Approval Date','Estimation Date' ,'Post Repair']
    };
    new Angular2Csv(externalArr, 'Approval Details Report', options);

  }
}