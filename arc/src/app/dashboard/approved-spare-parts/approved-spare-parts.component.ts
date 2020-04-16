import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddSparePartComponent } from '../add-spare-part/add-spare-part.component';
import { PendingEstimationService } from '../service/pending-estimation.service';
import { DeviceInTransitService } from '../service/device-in-transit.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-approved-spare-parts',
  templateUrl: './approved-spare-parts.component.html',
  styleUrls: ['./approved-spare-parts.component.scss']
})
export class ApprovedSparePartsComponent implements OnInit {

  getReEstimationDetailsRes:any;
  orderEstimateId: any;
  approvedAmount:any;
  comments;
  orderId;
  amsComment;

  constructor( public dialog: MatDialog, private _renderer: Renderer2, private messageService: MessageService,
    public dialogRef: MatDialogRef<ApprovedSparePartsComponent>, private deviceInTransitService:DeviceInTransitService) { }

  ngOnInit() {
    this.getReEstimationDetails();
  }

  getReEstimationDetails() {
    this.orderId = this.dialogRef._containerInstance._config.data.orderId,
    this.amsComment = this.dialogRef._containerInstance._config.data.amsComment
    let obj = {
      "orderId": this.orderId
    }
    this.deviceInTransitService.getReEstimationDetails(obj).subscribe(
      (res) => {
        
        if (res.responseCode == "200") {
          this.getReEstimationDetailsRes = res;
          this.comments = this.getReEstimationDetailsRes.response.estimation.approvedComments
          this.orderEstimateId = this.getReEstimationDetailsRes.response.estimation.orderEstimateId;
          for (let i = 0; i < this.getReEstimationDetailsRes.response.estimation.orderEstimateDtls.length; i++) {
            this.approvedAmount += parseFloat(this.getReEstimationDetailsRes.response.estimation.orderEstimateDtls[i].price) + parseFloat(this.getReEstimationDetailsRes.response.estimation.orderEstimateDtls[i].partTaxValue);
          }
        }
      },
      (err) => {

      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
