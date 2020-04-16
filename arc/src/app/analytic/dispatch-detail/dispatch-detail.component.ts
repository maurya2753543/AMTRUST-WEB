import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { AnalyticService } from '../analytic.service';

@Component({
  selector: 'app-dispatch-detail',
  templateUrl: './dispatch-detail.component.html',
  styleUrls: ['./dispatch-detail.component.scss']
})
export class DispatchDetailComponent implements OnInit {
  
  
  uploadInput: any;
  options: any = {};
  deviceResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData: boolean = false;
  dispatchDetailRes: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DispatchDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private analyticService: AnalyticService) { }

  getDispatchDetail() {
    let obj = this.dialogRef._containerInstance._config.data.obj;
    this.analyticService.getDispatchDetail(obj).subscribe(
      (res) => {
        this.dispatchDetailRes = res.responseObj;
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
    this.getDispatchDetail();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  downloadData(): void {
		let responseArr = this.dispatchDetailRes, internalArr = [], externalArr = [];
	
		for (let result of responseArr) {
		  internalArr = [];
		  internalArr.push(result.orderId);
		  internalArr.push(result.orderedDate);
		  internalArr.push(result.brand + " " + result.model);
		  internalArr.push(result.imeiNo);
		  internalArr.push(result.receivedDate);
		  internalArr.push(result.repairDate);
		  internalArr.push(result.dispatchDate);
		  internalArr.push(result.awbNumber);
		  internalArr.push(result.courierCompany);
		  externalArr.push(internalArr);
		}
		var options = {
		  headers: ['Repair Order No.', 'Repair Order Date', 'Device Name', 'IMEI No.' ,'Received Date','Repair Date','Dispatch Date','AWB Number','Courier Company']
		};
		new Angular2Csv(externalArr, 'Dispatch Details Report', options);
	
	  }
}