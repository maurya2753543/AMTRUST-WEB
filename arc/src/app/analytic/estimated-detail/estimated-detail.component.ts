import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { AnalyticService } from '../analytic.service';
@Component({
  selector: 'app-estimated-detail',
  templateUrl: './estimated-detail.component.html',
  styleUrls: ['./estimated-detail.component.scss'],
})
export class EstimatedDetailComponent implements OnInit {

  uploadInput: any;
  options: any = {};
  deviceResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData: boolean = false;
  estimateDetailRes: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EstimatedDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private analyticService: AnalyticService) { }

  getEstimateDetail() {
    let obj = this.dialogRef._containerInstance._config.data.obj;
    this.analyticService.getEstimateDetail(obj).subscribe(
      (res) => {

        this.estimateDetailRes = res.responseObj;
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
    this.getEstimateDetail();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  downloadData(): void {
    let responseArr = this.estimateDetailRes, internalArr = [], externalArr = [];

    for (let result of responseArr) {
      internalArr = [];
      internalArr.push(result.orderId);
      internalArr.push(result.orderedDate);
      internalArr.push(result.brand + " " + result.model);
      internalArr.push(result.imeiNo);
      internalArr.push(result.receivedDate);
      internalArr.push(result.estimationSubmissionDate);
      internalArr.push(result.timeTaken);
      internalArr.push(result.reEstimation);
      externalArr.push(internalArr);
    }
    var options = {
      headers: ['Repair Order No.', 'Repair Order Date', 'Device Name', 'IMEI No.' ,'Received Date','Estimation Submission Date','Time Taken','Re-Estimation']
    };
    new Angular2Csv(externalArr, 'Pending Estimation Report', options);

  }

}
