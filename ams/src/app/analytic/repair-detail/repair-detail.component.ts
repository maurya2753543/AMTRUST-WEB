import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { AnalyticService } from '../analytic.service';

@Component({
  selector: 'app-repair-detail',
  templateUrl: './repair-detail.component.html',
  styleUrls: ['./repair-detail.component.scss']
})
export class RepairDetailComponent implements OnInit {
  uploadInput: any;
  options: any = {};
  deviceResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData: boolean = false;
  repairTATDetailRes: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RepairDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private analyticService: AnalyticService) { }

  getRepairDetail() {
    let obj = this.dialogRef._containerInstance._config.data.obj;
    this.analyticService.getRepairTATDetails(obj).subscribe(
      (res) => {
    
        this.repairTATDetailRes = res.responseObj;
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
    this.getRepairDetail();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  downloadData(): void {
    let responseArr = this.repairTATDetailRes, internalArr = [], externalArr = [];

    for (let result of responseArr) {
      internalArr = [];
      internalArr.push(result.orderId);
      internalArr.push(result.orderedDate);
      internalArr.push(result.brand + " " + result.model);
      internalArr.push(result.imeiNo);
      internalArr.push(result.receivedDate);
      internalArr.push(result.repairDate);
      internalArr.push(result.revisedRepairDate + " (" + result.reEstimation + ")");
      internalArr.push(result.estimationDate);
      internalArr.push(result.postRepair);
      externalArr.push(internalArr);
    }
    var options = {
      headers: ['Repair Order No.', 'Repair Order Date', 'Device Name', 'IMEI No.','Received Date','Repair Date','Revised Repair Date (No of times repaired)','Estimation Date','Post Repair' ]
    };
    new Angular2Csv(externalArr, 'Repair Details Report', options);

  }
  
}