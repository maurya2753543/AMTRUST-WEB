import { Component, OnInit, Inject,Input,Output,EventEmitter, trigger, style, transition, animate } from '@angular/core';
import { Subject } from 'rxjs';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { DispatchDeviceServiceService } from '../../services/dispatch-device-service.service';
import { RepairOrderDetailsServiceService } from '../../services/repair-order-details-service.service';
import { MatDialog} from '@angular/material';
import { RepairOrderDetailsComponent } from '../../amc/repair-order-details/repair-order-details.component'


@Component({
  selector: 'app-device-dispatched-report',
  templateUrl: './device-dispatched-report.component.html',
  styleUrls: ['./device-dispatched-report.component.scss']
})
export class DeviceDispatchedReportComponent implements OnInit {
  response :any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData:boolean=false;
  isStatus:boolean=false;
  statusRes:any;
  isToggle: boolean = true;

  @Input() public show: boolean;

  @Output()
  changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() deviceDispatched = new EventEmitter();
  
  constructor(
    public dialog: MatDialog,
	  private dispatchDeviceServiceService: DispatchDeviceServiceService, private repairOrderDetailsServiceService: RepairOrderDetailsServiceService) { }

    ngOnInit() {
      this.disputedDevices();
    }

  disputedDevices(){
    var obj ={
      "countryId":localStorage.getItem("countryId"),
      "orderState":"Disputed"
    }
    
    this.dispatchDeviceServiceService.getDispatchDeviceReport(obj).subscribe(
      (res)=>{
        this.response = res.responseObj;
        
        this.isTableData=true;
        this.dtTrigger.next();
        console.log("response",this.response);
      }
    )
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }
    
  getRepairOrderDetails(orderId){
   
      let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
        width: '500px',
        data: { "orderId": orderId }
      });
     
  }
  
  getStatusDetails(claimId, orderId, model, imeiNo,disputedBy, disputedReason, status){
    let obj ={
      "orderId": orderId,
      "claimId": claimId,
      "model": model,
      "imeiNo": imeiNo,
      "disputedBy": disputedBy,
      "disputedReason": disputedReason,
      "action": status
    }
    console.log("object",obj);
    this.dispatchDeviceServiceService.getDispatchStatus(obj).subscribe(
      (res)=>{
        this.deviceDispatched.emit();
        this.isStatus = true;
        this.statusRes = res.responseObj;
        this.isTableData = false;
        this.disputedDevices();
        setTimeout(() => {
          this.isStatus = false;
        }, 3500);
      },
      (err) => {
      }
    )
  }

  downloadData(): void{
    let responseArr = this.response, internalArr = [],externalArr = [];
      console.log("responseArr",this.response);

    for(let result of responseArr){
      internalArr=[];
      internalArr.push(result.claimId == null||undefined ? 'NA': result.claimId);
      internalArr.push(result.claimType == null||undefined ? 'NA': result.claimType);
      internalArr.push(result.imeiNo == null||undefined ? 'NA': "-"+ result.imeiNo+"-");
      internalArr.push(result.brand == null||undefined ? 'NA': result.brand);
      internalArr.push(result.model == null||undefined ? 'NA': result.model);
      internalArr.push(result.model == null||undefined ? 'NA': result.model);
      internalArr.push(result.disputedReason == null||undefined ? 'NA': result.disputedReason);
      internalArr.push(result.disputedBy == null||undefined ? 'NA': result.disputedBy);
      internalArr.push(result.arcName == null||undefined ? 'NA': result.arcName);
      internalArr.push(result.comments == null||undefined ? 'NA': result.comments);
      externalArr.push(internalArr);
      
    }
    var options = { 
      headers: ['Claim Id','Type Of Claim','IMEI No.','Brand','Model','Device Name','Disputed Reason','Disputed By','Arc Name','Arc Remark']
      };
      new Angular2Csv(externalArr, 'Disputed Device Report',options);    
      
  }


}
