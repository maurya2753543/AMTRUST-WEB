import { Component, Inject, OnInit, OnChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { windowWhen } from 'rxjs/operator/windowWhen';
import { MessageService } from '../../services/message.service'
import { EstimationApprovalServiceService } from '../../services/estimation-approval-service.service';
import { getOrCreateInjectable } from '@angular/core/src/render3/di';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-estimation-amount',
  templateUrl: './estimation-amount.component.html',
  styleUrls: ['./estimation-amount.component.scss']
})
export class EstimationAmountComponent implements OnInit, OnChanges {

  selected = "0";
  isSelected: boolean = false;
  currentImg: any;
  res: any;
  isSubmitted: boolean = false;
  versionResponse: any;
  deviceResponse: any;
  comments:any;
  estComments;
  deviceResponseObj: any;
  deviceResponseReestimation: any;
  deviceResponseServiceCharge: any;
  deviceResponseTotalAmt: any;
  deviceResponseImageRes: any;
  deviceResponseTaxAmount: any;
  imgSelector: any = "";
  fileTypeResponse: any;
  approvalStatus: boolean = false;
  message: string = "";
  hasImage: boolean = false;
  noSelectedImage: boolean = true;
  commentsFromData;
  

  constructor(private messageService: MessageService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<EstimationAmountComponent>, private estimationApprovalServiceService: EstimationApprovalServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnChanges() {

  }

  ngOnInit() {
    this.getReEstimation();
    this.getEstimationHistory();
    this.getImageResponse();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  gotValue() {
    this.isSelected = true;
  }
  getReEstimation(): void {
    this.commentsFromData = this.data.comments;
    
    var obj = {
      "orderEstimateId": this.dialogRef._containerInstance._config.data.orderEstimateId
    }

    this.estimationApprovalServiceService.getReEstimation(obj).subscribe(
      (res) => {
        if (res.responseCode == "200") {
          //this.hasImage=true;
          
          this.deviceResponseObj = res.responseObj
          this.deviceResponseReestimation = res.responseObj.orderEstimateDtls;
          this.deviceResponseServiceCharge = res.responseObj.serviceCharge;
          this.deviceResponseTaxAmount = res.responseObj.taxValue;
          this.deviceResponseTotalAmt = res.responseObj.totalAmt;
        } else {
          console.log("Data Not Found");
        }
      }
    )
  }

  getEstimationStatus(status): void {
    let obj = JSON.parse(JSON.stringify(this.deviceResponseObj));
    obj.orderEstimateDetails=this.deviceResponseReestimation;
    delete obj.orderEstimateDtls;
    obj.action = status;
   
    obj.approvedComments = this.estComments;
    
    this.estimationApprovalServiceService.getEstimateStatus(obj).subscribe(
      (res) => {
        if (res.responseCode == 200) {

          this.message = status + " Successfully!"
          this.isSubmitted = true;
        }
        this.messageService.sendMessage('reloadAfterReestimation');
      },
      (err) => {

      }
    );
    setTimeout(() => {
      this.onNoClick()
    }, 3000);;
  }


  getImageResponse() {
    
    var obj = {
      "orderId": this.dialogRef._containerInstance._config.data.orderId
    }
    this.estimationApprovalServiceService.getImages(obj).subscribe(
      (res) => {
        
        if (res.responseCode == "200") {
          this.hasImage = true
          this.deviceResponseImageRes = res.responseObj;
          this.imgSelector = this.deviceResponseImageRes.filter((item) => item.fileType.toLowerCase() == "top image")
          this.noSelectedImage = false;
        } else {
         
        }



      }
    )
  }

  getImage(imageType) {
    
    this.imgSelector = this.deviceResponseImageRes.filter((item) => item.fileType.toLowerCase() == imageType);
    if (this.imgSelector.length > 0) {
      this.noSelectedImage = false;
    }
    else {
      this.noSelectedImage = true;
    }
  }

  getEstimationHistory() {
    var obj = {
      "orderId": this.dialogRef._containerInstance._config.data.orderId
    }
    this.estimationApprovalServiceService.getBOMHistory(obj).subscribe(
      (res) => {
        this.versionResponse = res.response.bomHistory;
      }
    )
  }
}
