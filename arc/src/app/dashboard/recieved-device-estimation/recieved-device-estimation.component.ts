import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddSparePartComponent } from '../add-spare-part/add-spare-part.component';
import { PendingEstimationService } from '../service/pending-estimation.service';
import { DeviceInTransitService } from '../service/device-in-transit.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { environment } from '../../../environments/environment';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-recieved-device-estimation',
  templateUrl: './recieved-device-estimation.component.html',
  styleUrls: ['./recieved-device-estimation.component.scss']
})

export class RecievedDeviceEstimationComponent implements OnInit {
  BOMResponse: any;
  taxVal: number = 0;
  totalAmount: number = 0;
  serviceCharge: any;
  crmModel:any=this.dialogRef._containerInstance._config.data.crmModel;
  taxPercentage: any;
  addRecord: boolean = false;
  selectModal: boolean = true;
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
  baseUrl: string = environment.hostUrl;
  showFileUploadSuccessMessage: any;
  showFileUploadSuccess: boolean = false;
  fileType: any;
  BOMHistory: any;
  orderImage: any;
  orderImageRes: any;
  totalTaxVal: any;
  totalAmountVal: any;
  showError: boolean = false;
  sparePartVal: any;
  sparePartTaxVal: any;
  totalSparePartAmount: any;
  totalLabourAmount: any;
  labourCharge: any;
  modelList: any;
  selectedModel: any;
  selectedModelValue:any;
  confirmation:boolean=false;
  //ngx options
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  comments: string;
  imagesLoadedTopImg: boolean = false;
  imagesLoadedBtmImg: boolean = false;
  imagesLoadedLftImg: boolean = false;
  imagesLoadedRghtImg: boolean = false;
  imagesLoadedFrntImg: boolean = false;
  imagesLoadedBckImg: boolean = false;
  allImagesLoaded: boolean = false;
  onBOMopen: boolean = false;
  //ngx options

  constructor(private messageService: MessageService,
    public dialog: MatDialog, private _renderer: Renderer2,
    public dialogRef: MatDialogRef<RecievedDeviceEstimationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private deviceInTransitService: DeviceInTransitService, private pendingEstimationService: PendingEstimationService
  ) {
    this.options = { concurrency: 0, allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'] };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

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
  filesArray = [
    { viewValue: 'Top Image' },
    { viewValue: 'Bottom Image' },
    { viewValue: 'Front Image' },
    { viewValue: 'Back Image' },
    { viewValue: 'Left Image' },
    { viewValue: 'Right Image' },
    { viewValue: 'Estimate' }
  ];
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

  setModelValue(deviceModelId){
    this.selectedModelValue=this.modelList.filter(model=>model.deviceModelId==deviceModelId)[0].modelName;
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
    var obj = {
      "countryId": localStorage.getItem("countryId"),
      "brandId": this.dialogRef._containerInstance._config.data.brandId,
      "modelId": parseInt(this.selectedModel),
      "orderId":this.dialogRef._containerInstance._config.data.orderId
    }

    this.isLoading = true;
    this.pendingEstimationService.getBOM(obj).subscribe(
      (res) => {

        this.isLoading = false;
        this.BOMResponse = res;
      },
      (err) => {

      }
    )
  }

  add() {
    let obj = {
      "countryId": localStorage.getItem("countryId"),
      "modelId": parseInt(this.selectedModel),
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

  calAmountEstimation(serCharge, taxPercentage) {
    if (serCharge && taxPercentage) {
      let taxVal = (parseFloat(serCharge) * parseFloat(taxPercentage)) / 100;
      return taxVal;
    }
  }

  ngOnInit() {
    this.getModelList();
  }

  getBomTemplateData() {
    this.getBOM();
    this.getRepairOrderDetails();
    this.getTaxGroup();
    this.getOrderImages();
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

  getOrderImages() {
    let obj = {
      "orderId": this.dialogRef._containerInstance._config.data.orderId
    }
    this.pendingEstimationService.getOrderImages(obj).subscribe(
      (res) => {
        this.orderImageRes = res.responseObj;
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

  deleteImage(id) {
    let obj = {
      "reapirOrderImagesId": id
    }
    this.isLoading = true;
    this.pendingEstimationService.deleteImage(obj).subscribe(
      (res) => {
        this.isLoading = false;
        this.getOrderImages();
      },
      (err) => {

      }
    )
  }

  submitBOM() {
    debugger;
    this.isLoading = true;
    
    this.initializeEstimateArray();
    for (let i = 0; i < this.taxGroup.responseObj.length; i++) {
      if (this.taxGroup.responseObj[i].rateApplicable == this.taxPercentage) {
        this.taxgrpId = this.taxGroup.responseObj[i].taxGroupId;
        break;
      }
    }
    this.submitBOMObj = {
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

    this.pendingEstimationService.saveEstimation(this.submitBOMObj).subscribe(
      (res) => {
        debugger;
        this.bomSubmitRes = res;
        this.bomRessMessage = this.bomSubmitRes.response.Estimation;
        this.isLoading = false;
        this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);
        this.onNoClick();
      },
      (err) => {

      }
    )

    
    
  }

  numberWithCommas(x) {
    ;
    x= x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    // this.labourCharge=this.labourCharge.replace(/,/g, '');
    this.labourCharge=this.labourCharge;
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

  startUpload(): void {
    this.files = [];
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.baseUrl + '/repairPortal/uploadDeviceImages',
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
      data: { orderId: this.dialogRef._containerInstance._config.data.orderId, fileType: this.fileType }
    };
    this.uploadInput.emit(event);
  }

  onUploadOutput(output: UploadOutput): void {
    
    if (output.type == "rejected") {
      if (output.file.type == "image/jpeg" || output.file.type == "image/jpg" || output.file.type == "image/png" || output.file.type == "application/pdf") {
        this.showError = false;
        this.files.push(output.file);
      }
      else {
        this.files = [];
        this.showError = true;
      }
    }
    if (output.type == "addedToQueue") {
      if (output.file.type == "image/jpeg" || output.file.type == "image/jpg" || output.file.type == "image/png" || output.file.type == "application/pdf") {
        this.showError = false;
        this.files.push(output.file);
        console.log("total files",this.files);
      }
      else {
        this.files = [];
        this.showError = true;
      }
    }
    if (output.type === 'start') {
      this.isLoading = true;
    }
    if (output.type === 'done') {
      ;
      if (output.file.response.responseCode == '200') {
        this.getOrderImages();
        setTimeout(() => {    //<<<---    using ()=> syntax
          document.getElementById('showFileUploadSuccess').innerHTML = output.file.response.responseObj;
          document.getElementById('showFileUploadSuccess').style.display = 'block';
          document.getElementById('myLoader').style.display = 'none';
          let element: HTMLElement = document.getElementsByClassName('cdk-overlay-container')[0] as HTMLElement;
          element.click();

        }, 3000);
        this.resetItems();
        setTimeout(() => {
          document.getElementById('showFileUploadSuccess').style.display = 'none';
        }, 6000);
      }
      else {
        this.isLoading = false;
      }
    }
  }
  checkImages(){
    if(this.orderImageRes){
      
      let totalImages = this.orderImageRes.length;
      // ;
      for(let k=0; k < totalImages; k++){
      // let imagesloaded =false;
      
        if(this.orderImageRes[k].fileType.indexOf("Top Image")> -1){
          this.imagesLoadedTopImg=true;
        }
        //this.imagesLoaded=false;
        if(this.orderImageRes[k].fileType.indexOf("Bottom Image")> -1){
          this.imagesLoadedBtmImg=true;
        }
        if(this.orderImageRes[k].fileType.indexOf("Left Image")> -1){
          this.imagesLoadedLftImg=true;
        }
        if(this.orderImageRes[k].fileType.indexOf("Right Image")> -1){
          this.imagesLoadedRghtImg=true;
        }
        if(this.orderImageRes[k].fileType.indexOf("Front Image")> -1){
          this.imagesLoadedFrntImg=true;
        }
        if(this.orderImageRes[k].fileType.indexOf("Back Image")> -1){
          this.imagesLoadedBckImg=true;
        }
      }
    }
    if(this.imagesLoadedTopImg == true && this.imagesLoadedBtmImg == true 
      && this.imagesLoadedFrntImg == true && this.imagesLoadedBckImg == true 
      && this.imagesLoadedLftImg == true && this.imagesLoadedRghtImg == true ){
        this.allImagesLoaded = true;
    }

    if(this.allImagesLoaded == true){
      debugger;
      this.confirmation=true 
    }else{
      this.onBOMopen = true;
      setTimeout(() => {
        this.onBOMopen = false
      }, 5000);
      
    }

  }
  resetItems() {
    this.fileType = '';
    this.orderImage = '';
  }

}

