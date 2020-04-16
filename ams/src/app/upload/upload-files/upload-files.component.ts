import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  QCTaskList: any;
  isLoading: boolean = false;
  baseUrl: string = environment.hostUrl;
  showFileUploadSuccess: boolean = false;
  showFileUploadSuccessMessage: string;
  uploadQCRequest: any;
  qualityList: any;
  QCFile: any;
  abc: any;
  QLString: string = '';
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  comments: string;
  successStatus: boolean=false
  successMsg: string;
  submitBtn: boolean = false;

  constructor() {
    this.options = { concurrency: 1 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  // constructor(public dialogRef: MatDialogRef<UploadFilesComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


  startUpload(): void {
    
    this.isLoading = true;
    // this.initializeRequestObj();
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.baseUrl + '/repairEstimation/uploadExcel',
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },

    };
    
    this.uploadInput.emit(event);
    //this.successMsg = ""
    this.ngOnInit();
  }
  


  onUploadOutput(output: UploadOutput): void {

    if (output.type == "addedToQueue") {

      this.submitBtn = false;
      let fileName = output.file.name;
      let extArr = fileName.split(".");
      let length = extArr.length;
      let extension = extArr[length - 1];
      if (extension === "xls" || extension === "xlsx") {
        this.submitBtn = true;
      }
      else {
        document.getElementById("loader").style.display = "none";
        this.successStatus=true;
        this.successMsg = "Please upload excel file only"
        this.makeSuccessMsgBlank();
      }
    }

    if (output.type == 'done') {

      if (output.file.response.responseCode == '200') {
        
        this.isLoading = false;
        this.showFileUploadSuccessMessage = output.file.response.responseObj;
        console.log("message", this.showFileUploadSuccessMessage)
        this.successMsg=output.file.response.responseObj;
        this.showFileUploadSuccess = true;
        this.successStatus=true;
        this.successMsg = "File uploaded successfully";
        // let element: HTMLElement = document.getElementById('loader') as HTMLElement;
        // element.click();
        this.makeSuccessMsgBlank();

      }else if (output.file.response.responseCode == '100') {
        
        
        this.successMsg = "Invalid Excel File";
        this.submitBtn=false;
        document.getElementById("loader").style.display = "none";
        
        this.makeSuccessMsgBlank();
        

      }
    }
  }

  makeSuccessMsgBlank(){
    setTimeout(() => {
      this.successStatus = false;
    }, 3000);
  }
}
