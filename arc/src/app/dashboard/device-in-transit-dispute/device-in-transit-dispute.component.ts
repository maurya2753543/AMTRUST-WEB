import { Component, Inject, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeviceInTransitService } from '../service/device-in-transit.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { environment } from '../../../environments/environment';
import { MessageService } from '../service/message.service';
@Component({
  selector: 'app-device-in-transit-dispute',
  templateUrl: './device-in-transit-dispute.component.html',
  styleUrls: ['./device-in-transit-dispute.component.scss']
})
export class DeviceInTransitDisputeComponent implements OnInit {

  country;
  bigFileSize:boolean=false;
  pickList: any[];
  showWrongExtError: boolean = false;
  comments: any;
  disputeTypes: any;
  baseUrl: string = environment.hostUrl;
  showFileUploadSuccess: boolean = false;
  showFileUploadSuccessMessage: string;
  isLoading: boolean = false;
  disputeFile: any;
  //ngx options
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  //ngx options

  constructor(private messageService: MessageService, public dialogRef: MatDialogRef<DeviceInTransitDisputeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private deviceInTransitService: DeviceInTransitService) {
    this.options = { concurrency: 1 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  startUpload(): void {
    if (typeof this.disputeFile != "undefined" && typeof this.disputeFile != null) {
      this.isLoading = true;
      const event: UploadInput = {
        type: 'uploadAll',
        url: this.baseUrl + '/repairPortal/saveDispute',
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        data: { comment: this.comments, disputeTypes: this.disputeTypes, orderId: this.dialogRef._containerInstance._config.data.orderId }
      };
      debugger;
      this.uploadInput.emit(event);
    }
    else {
      this.isLoading = true;
      let obj = {
        "disputeTypes": this.disputeTypes,
        "comment": this.comments,
        "orderId": this.dialogRef._containerInstance._config.data.orderId
      }
      this.deviceInTransitService.uploadDispute(obj).subscribe(
        (res) => {
        this.isLoading=false;
        let element: HTMLElement = document.getElementById('cancelButton') as HTMLElement;
        element.click();
        this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);
        },
        (err) => {

        }
      )
    }

  }

  onUploadOutput(output: UploadOutput): void {
    if(typeof(output.file) === "undefined"){
    }else{
      if(output.file.size>20971520){
        this.bigFileSize =  true
        setTimeout(() => {
          this.bigFileSize = false;
        }, 4000);
      }else{
        this.files.push(output.file);
      }
    }
    
    if (output.type === 'done') {
      if (output.file.response.responseCode == '201') {
        this.isLoading = false;
        this.showFileUploadSuccessMessage = output.file.response.responseObj;
        this.showFileUploadSuccess = true;
        let element: HTMLElement = document.getElementById('cancelButton') as HTMLElement;
        element.click();
        this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);
      }
      else {
        this.isLoading = false;
      }
    }
  }

  disableSubmit() {
    if (this.showWrongExtError || !this.comments || !this.disputeTypes) {
      return true;
    }
    else {
      return false;
    }
  }

  getPickList() {
    this.deviceInTransitService.getDisputeDetails().subscribe(
      (res) => {
        this.country = localStorage.getItem('countryId');
        if(this.country == 1){
          this.pickList=res.responseObj.filter((item) =>{
            debugger
            if(item.disputeId !== 3){
              return item
            }
          })
        }else{
          this.pickList=res.responseObj
        }
      }
    )
  }

  ngOnInit() {
    this.getPickList();
  }
}