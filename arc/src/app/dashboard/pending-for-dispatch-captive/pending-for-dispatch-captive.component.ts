import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PendingForDispatchService } from '../../dashboard/service/pending-for-dispatch.service'
import { DeviceInTransitService } from '../service/device-in-transit.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MessageService } from '../service/message.service'
@Component({
  selector: 'app-pending-for-dispatch-captive',
  templateUrl: './pending-for-dispatch-captive.component.html',
  styleUrls: ['./pending-for-dispatch-captive.component.scss']
})
export class PendingForDispatchCaptiveComponent implements OnInit {

  constructor(private messageService: MessageService, private deviceInTransitService: DeviceInTransitService, private pendingForDispatchService: PendingForDispatchService, private datePipe: DatePipe, public dialogRef: MatDialogRef<PendingForDispatchCaptiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getPrePopUpValues();
  }
  awbNo: any;
  courierName: any;
  bookedDateTime: any;
  newDate: any;
  orderId: any;
  pickingPerson: any;
  comments: any;
  res: any;
  customerInfoRes:any=[];
  awbNumber:any;
  onNoClick() {
    this.dialogRef.close();
  }

  getPrePopUpValues() {
     
    this.courierName = this.dialogRef._containerInstance._config.data.courierName;
    this.bookedDateTime = this.dialogRef._containerInstance._config.data.bookedDateTime;
    this.awbNumber=this.dialogRef._containerInstance._config.data.awbNumber;
  }

  submitDispatchForOthers() {
    
    var obj = {
      "orderId": this.dialogRef._containerInstance._config.data.orderId,
      "dispatchDateTime": moment(this.newDate).format("DD/MM/YYYY HH:mm:ss"),
      "comment": this.comments,
      "pickupBy": this.pickingPerson,
      "country":localStorage.getItem("countryId")

    }
    this.pendingForDispatchService.submitCaptiveDispatch(obj).subscribe(
      (res) => {
         debugger;
        if (res.responseMsg == "success") {
           
          this.onNoClick();
          this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);
        }
        else {
        }
      },
      (err) => {
      }
    )
  }

}
