import { Component, Inject, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RepairInProgressService } from '../service/repair-in-progress.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { environment } from '../../../environments/environment';
import { MessageService } from '../service/message.service';
@Component({
  selector: 'app-repair-in-progress-done',
  templateUrl: './repair-in-progress-done.component.html',
  styleUrls: ['./repair-in-progress-done.component.scss']
})
export class RepairInProgressDoneComponent implements OnInit {
  QCTaskList: any;
  isLoading: boolean = false;
  baseUrl: string = environment.hostUrl;
  showFileUploadSuccess: boolean = false;
  showFileUploadSuccessMessage: string;
  uploadQCRequest: any;
  qualityList: any;
  QCFile: any;
  abc:any;
  QLString:string='';
  //ngx options
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  comments: string;
  //ngx options

  constructor(private messageService: MessageService,
    public dialogRef: MatDialogRef<RepairInProgressDoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private repairInProgressService: RepairInProgressService
  ) {
    this.options = { concurrency: 1 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initializeRequestObj() {

    this.uploadQCRequest = {
      "comment": this.comments,
      "qualityList": this.initializeQLObj(),
      "orderId": this.dialogRef._containerInstance._config.data.orderId
    }

    // this.abc="{" +  this.uploadQCRequest + "}";
  }

  initializeQLObj() {
    this.qualityList = [];
    for (let i = 0; i < this.QCTaskList.responseObj.length; i++) {
      this.qualityList.push(
        {
          "qcTaskNameId": this.QCTaskList.responseObj[i].qcTaskNameId,
          "name": this.QCTaskList.responseObj[i].name,
          "isSelectedCheck": this.QCTaskList.responseObj[i].isSelectedYes
        }
      );
    }
    this.QLString=this.qualityList.toString()
    return this.qualityList;
  }

  getQCTask() {
    this.repairInProgressService.getQCTaskNames().subscribe(
      (res) => {
        debugger;
        this.QCTaskList = res;
      },
      (err) => {

      }
    )
  }

  setItem(item, val) {
    debugger;
    item.isSelectedYes = val;
  }

  startUpload(): void {
    this.isLoading = true;
    this.initializeRequestObj();
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.baseUrl + '/repairPortal/completeRO',
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
      data: { uploadQCRequest: JSON.stringify(this.uploadQCRequest) }
    };
    this.uploadInput.emit(event);
  }

  onUploadOutput(output: UploadOutput): void {
    this.files.push(output.file);
    if (output.type === 'done') {
      if (output.file.response.responseCode == '200') {
        this.isLoading = false;
        this.showFileUploadSuccessMessage = output.file.response.responseObj;
        this.showFileUploadSuccess = true;
        let element: HTMLElement = document.getElementById('cancelButton') as HTMLElement;
        element.click();
        document.getElementById("loader").style.display = "none";
        this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);  
      }
      else {
        let element: HTMLElement = document.getElementById('cancelButton') as HTMLElement;
        element.click();
        document.getElementById("loader").style.display = "none";
        this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);  
      }
    }
  }

  disableSubmit() {

    if (!this.QCFile || !this.comments) {
      return true;

    } else {
      return false;
    }
  }

  ngOnInit() {
    this.getQCTask();
  }
}
