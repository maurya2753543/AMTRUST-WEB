import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DeviceInTransitService} from '../../dashboard/service/device-in-transit.service';
import { RepairOrderDetailsComponent } from '../../dashboard/repair-order-details/repair-order-details.component'
import { Subject } from 'rxjs';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import {DeviceTrackingComponent} from '../../dashboard/device-tracking/device-tracking.component';
@Component({
  selector: 'app-device-in-transit-report',
  templateUrl: './device-in-transit-report.component.html',
  styleUrls: ['./device-in-transit-report.component.scss']
})
export class DeviceInTransitReportComponent {
 
  uploadInput : any;
  options : any = {};
  deviceResponse: any;
  // logisticsPartner:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData:boolean=false;
  
 	constructor(
    public dialog: MatDialog,private deviceInTransitService:DeviceInTransitService
  ) { }

  trackAWB(item) {
    let dialogRef = this.dialog.open(DeviceTrackingComponent, {
      width: '500px',
      data: { item: item }
    });
  }

  getDevicesInTransit() {
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
      "orderState": "Device in Transit",
      "isDetailView":true
    }
    this.deviceInTransitService.getDeviceInTransit(obj).subscribe(
      (res) => {
         
        this.deviceResponse = res.response.roList;
        this.dtTrigger.next();
        this.isTableData = true;
      },
      (err) => {

      }
    )
    
  }
  getRepairOrderDetails(orderId): void {
    let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
      width: '500px',
      data: { orderID: orderId }
    });
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
 }

 ngOnInit() {
  this.getDevicesInTransit();
}

  downloadData(): void{
    let responseArr = this.deviceResponse, internalArr = [],externalArr = [];
      

    for(let result of responseArr){
      internalArr=[];
      internalArr.push(result.claimNo == null||undefined ? 'NA': result.claimNo);
      internalArr.push(result.claimType == null||undefined ? 'NA': result.claimType);
      internalArr.push(result.policyHolderName == null||undefined ? 'NA': result.policyHolderName);
      internalArr.push(result.brand == null||undefined ? 'NA': result.brand);
      internalArr.push(result.model == null||undefined ? 'NA': result.model);
      internalArr.push(result.imeiNo == null||undefined ? 'NA': "-"+result.imeiNo+"-" );
      internalArr.push(result.eta == null||undefined ? 'NA': result.eta);
      internalArr.push(result.awbNo == null||undefined ? 'NA': "-"+result.awbNo+"-");
      internalArr.push(result.courierName == null||undefined ? 'NA': result.courierName);
      externalArr.push(internalArr);
    }
    var options = { 
      headers: ['Claim No','Claim Type','Customer Name','Brand Name','Model Name','IMEI No.','Estimation','AWB No.','Courier Name']
      };
      new Angular2Csv(externalArr, 'Device in Transit Report',options);    
      
  }

}
