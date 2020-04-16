import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
@Component({
  selector: 'app-device-in-transit-recieved',
  templateUrl: './device-in-transit-recieved.component.html',
  styleUrls: ['./device-in-transit-recieved.component.scss']
})
export class DeviceInTransitRecievedComponent {

  selectedFiles:any;
  selected = "type";
  today: number = Date.now();

  constructor(public dialogRef: MatDialogRef<DeviceInTransitRecievedComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
      this.files.push(output.file);
    }
  }
}