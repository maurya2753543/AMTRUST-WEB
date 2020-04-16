import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddSparePartComponent } from '../add-spare-part/add-spare-part.component';
import { PendingEstimationService } from '../service/pending-estimation.service';
import { DeviceInTransitService } from '../service/device-in-transit.service';
import { MessageService } from '../service/message.service';
@Component({
  selector: 'app-recieved-device-reestimation',
  templateUrl: './recieved-device-reestimation.component.html',
  styleUrls: ['./recieved-device-reestimation.component.scss']
})
export class RecievedDeviceReEstimationComponent implements OnInit {
  uploadInput: any;
  options: any = {};
  BOMResponse: any;
  taxVal: number = 0;
  totalAmount: number = 0;
  labourCharge: any;
  crmModel:any=this.dialogRef._containerInstance._config.data.crmModel;
  taxPercentage: any;
  sparePartVal: any;
  sparePartTaxVal: any;
  totalSparePartAmount: any;
  addRecord: boolean = false;
  selectModal:boolean=true;
  newPartName: string;
  newDescription: string;
  newPrice: any;
  newTaxes: any;
  newComment: string;
  addArray = [];
  newPartCode: string;
  submitBOMObj = {}
  res: any;
  comment: any;
  estimateArray: any = [];
  submitEstimateArray = [];
  taxGroup: any;
  countryId: any;
  modelId: any;
  brandId: any;
  taxgrpId: any;
  bomSubmitRes: any;
  bomRessMessage: any;
  isLoading: boolean = false;
  selectedArray = [];
  itemExist: boolean = true;
  amountCalculated: boolean = false;
  getReEstimationDetailsRes: any;
  approvedAmount: number = 0;
  orderEstimateId: any;
  BOMHistory: any;
  totalTaxVal: any;
  totalLabourAmount: any;
  totalAmountVal: any;
  modelList: any;
  selectedModel: any;
  selectedModelValue:any;
  confirmation:boolean=false;
  /**Declearation for show hide panel content */
  isToggle: boolean = false;

  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;
  constructor(
    public dialog: MatDialog, private _renderer: Renderer2, private messageService: MessageService,
    public dialogRef: MatDialogRef<RecievedDeviceReEstimationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private deviceInTransitService: DeviceInTransitService, private pendingEstimationService: PendingEstimationService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel() {
    this.addRecord = false;
    this.newPartName = '';
    this.newDescription = '';
    this.newPrice = '';
    this.newTaxes = '';
    this.newComment = '';
    this.newPartCode = '';
  }

  /**
   * Add spare part & price
   */
  addSharePart(): void {
    let dialogRef = this.dialog.open(AddSparePartComponent, {
      width: '280px',
      disableClose: true,
      data: { name: 'test' }
    });
  }

  onlyNumber(e) {

    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return true;
    } else if (!(e.keyCode > 47 && e.keyCode < 58) || e.shiftKey) {
      e.preventDefault();
      return false;
    }
  }
  calPerValue(val, per) {
    var value = parseFloat(val);
    var percentage = parseFloat(per);
    return (value * percentage) / 100;
  }

  getBOM() {
    debugger
    var obj = {
      "countryId": localStorage.getItem("countryId"),
      "brandId": this.dialogRef._containerInstance._config.data.brandId,
      "modelId": this.dialogRef._containerInstance._config.data.modelId,
      "orderId":this.dialogRef._containerInstance._config.data.orderId
    }

    this.isLoading = true;
    this.pendingEstimationService.getBOM(obj).subscribe(
      (res) => {
        debugger
        this.isLoading = false;
        this.BOMResponse = res;
      },
      (err) => {

      }
    )
  }

  getReEstimationDetails() {
    let orderId = this.dialogRef._containerInstance._config.data.orderId;
    let obj = {
      "orderId": orderId
    }
    this.deviceInTransitService.getReEstimationDetails(obj).subscribe(
      (res) => {
        if (res.responseCode == "200") {
          debugger;
          this.getReEstimationDetailsRes = res;
          this.orderEstimateId = this.getReEstimationDetailsRes.response.estimation.orderEstimateId;
          for (let i = 0; i < this.getReEstimationDetailsRes.response.estimation.orderEstimateDtls.length; i++) {
            this.approvedAmount += parseFloat(this.getReEstimationDetailsRes.response.estimation.orderEstimateDtls[i].price) + parseFloat(this.getReEstimationDetailsRes.response.estimation.orderEstimateDtls[i].partTaxValue);
          }
          this.getBOM();
        }
      },
      (err) => {

      }
    )
  }

  add() {
    let obj = {
      "countryId": localStorage.getItem("countryId"),
      "modelId": this.dialogRef._containerInstance._config.data.modelId,
      "brandId": this.dialogRef._containerInstance._config.data.brandId,
      'partName': this.newPartName,
      'partDesc': this.newDescription,
      'partCode': this.newPartCode,
      'price': this.newPrice,
      "taxGrpId": this.newTaxes
    }
    this.pendingEstimationService.addDevicesForAMS(obj).subscribe(
      (res) => {
        this.addRecord = false;
        this.getBOM();
        this.cancel();
      },
      (err) => {

      }
    )
  }

  enableAdd() {
    if (!this.newPartName || !this.newPartCode || !this.newDescription || !this.newPrice || typeof (this.newTaxes) == 'undefined') {
      return true
    }
    else {
      return false;
    }
  }

  @Output()
  changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggle() {
    this.isToggle = !this.isToggle;
    this.changeExpansion.emit(this.isToggle);
  }

  calAmountEstimation(serCharge, taxPercentage) {
    if (serCharge && taxPercentage) {
      let taxVal = (parseFloat(serCharge) * parseFloat(taxPercentage)) / 100;
      return taxVal;
    }
  }

  ngOnInit() {
    this.getBOM();
    this.getReEstimationDetails();
    this.getRepairOrderDetails();
    this.getTaxGroup();
    this.getBOMHistory();
  }

  getModelList() {
    let obj = {
      "countryId":localStorage.getItem('countryId'),
      "brandId":this.dialogRef._containerInstance._config.data.brandId
      
    }
    this.pendingEstimationService.getModelList(obj).subscribe(
      (res) => {
        this.modelList = res.responseObj;
      },
      (err) => {

      }
    )
  }


  getTaxGroup() {
    let obj = {
      "countryId": localStorage.getItem("countryId")
    }
    this.pendingEstimationService.getTaxGroup(obj).subscribe(
      (res) => {

        this.taxGroup = res;
      },
      (err) => {

      }
    )
  }
  getRepairOrderDetails() {
    this.isLoading = true;
    var obj = {
      "orderId": this.dialogRef._containerInstance._config.data.orderId
    }

    this.deviceInTransitService.getRODetails(obj).subscribe(
      (res) => {

        this.isLoading = false;
        this.res = res;
      },
      (err) => {

      }
    )
  }

  getBOMHistory() {
    let orderId = this.dialogRef._containerInstance._config.data.orderId;
    let obj = {
      "orderId": orderId
    }

    this.pendingEstimationService.getBOMHistory(obj).subscribe(
      (res) => {
        this.BOMHistory = res.response.bomHistory;
      },
      (err) => {

      }
    )
  }


  submitBOM() {
    this.isLoading = true;
    this.initializeEstimateArray();
    for (let i = 0; i < this.taxGroup.responseObj.length; i++) {
      if (this.taxGroup.responseObj[i].rateApplicable == this.taxPercentage) {
        this.taxgrpId = this.taxGroup.responseObj[i].taxGroupId;
        break;
      }
    }
    this.submitBOMObj = {
      "orderEstimateId": this.orderEstimateId,
      "orderId": this.dialogRef._containerInstance._config.data.orderId,
      "totalAmt": this.totalAmountVal,
      "approvedComments": this.comment,
      "action": "Add New Estimate",
      "status": true,
      "serviceCharge": this.labourCharge,
      "taxGrpId": this.taxgrpId,
      "taxValue": this.totalTaxVal,
      "orderEstimateDtls": this.initializeEstimateArray()
    }
    this.pendingEstimationService.saveReEstimation(this.submitBOMObj).subscribe(
      (res) => {
        this.bomSubmitRes = res;
        this.bomRessMessage = this.bomSubmitRes.response.Estimation;
        this.isLoading = false;
        this.onNoClick();
         
        this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);
      },
      (err) => {
        let element: HTMLElement = document.getElementById('cancelButton') as HTMLElement;
        element.click();
         
        this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);
      }
    )
  }

  initializeEstimateArray() {
    this.estimateArray = [];
    for (let i = 0; i < this.BOMResponse.response.bomTemplate.length; i++) {
      if (this.BOMResponse.response.bomTemplate[i].checked) {
        this.estimateArray.push(
          {
            "partName": this.BOMResponse.response.bomTemplate[i].partName,
            "partId": this.BOMResponse.response.bomTemplate[i].partId,
            "partCode": this.BOMResponse.response.bomTemplate[i].partCode,
            "description": this.BOMResponse.response.bomTemplate[i].partDesc,
            "comments": this.BOMResponse.response.bomTemplate[i].comments,
            "partTaxValue": this.BOMResponse.response.bomTemplate[i].taxValue,
            "partTaxAmt": this.calAmountEstimation(this.BOMResponse.response.bomTemplate[i].price, this.BOMResponse.response.bomTemplate[i].taxValue),
            "approvalStatus": 2,
            "approvalComments": "Approved by ARC",
            "price": this.BOMResponse.response.bomTemplate[i].price
          }
        );
      }
    }
    return this.estimateArray;
  }



  calculateTaxAndAmount() {
     
    this.taxVal = 0;
    this.totalAmount = 0;
    this.totalAmountVal = 0;
    this.sparePartVal = 0;
    this.sparePartTaxVal = 0;
    this.totalTaxVal = 0;
    this.totalSparePartAmount = 0;
    this.totalLabourAmount = 0;
    for (var i = 0; i < this.BOMResponse.response.bomTemplate.length; i++) {
      if (this.BOMResponse.response.bomTemplate[i].checked) {
        var totalTaxVal = (parseFloat(this.BOMResponse.response.bomTemplate[i].price) * parseFloat(this.BOMResponse.response.bomTemplate[i].taxValue)) / 100;
        this.sparePartTaxVal += totalTaxVal;
        this.sparePartVal += parseFloat(this.BOMResponse.response.bomTemplate[i].price);
        this.BOMResponse.response.bomTemplate[i].taxamt = totalTaxVal;
        this.amountCalculated = true;
      }
    }
    if (typeof this.labourCharge == 'undefined') {
      this.labourCharge = 0;
    }
    if (typeof this.labourCharge != 'undefined' && typeof this.taxPercentage == 'undefined') {
      this.taxPercentage = 0;
    }
    this.taxVal = (parseFloat(this.labourCharge) * parseFloat(this.taxPercentage)) / 100;
    this.taxVal = parseFloat(this.taxVal.toFixed(2));
    this.totalLabourAmount = this.taxVal + parseFloat(this.labourCharge);
    this.totalSparePartAmount = parseFloat(this.sparePartVal) + parseFloat(this.sparePartTaxVal);
    this.totalTaxVal = this.taxVal + this.sparePartTaxVal;
    this.totalTaxVal = parseFloat(this.totalTaxVal.toFixed(2));
    this.totalAmount = parseFloat(this.labourCharge) + parseFloat(this.sparePartVal);
    this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    this.totalAmountVal += this.totalAmount + this.totalTaxVal;
    this.totalAmountVal = parseFloat(this.totalAmountVal.toFixed(2));
  }

  calculateValues(item) {
    let value = (item.price * item.taxValue) / 100;
    var valueParsed = parseFloat(value.toFixed(2));
    return valueParsed;
  }

  onUploadOutput(event) { }
}

