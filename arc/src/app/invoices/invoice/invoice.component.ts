import { Component, OnInit, EventEmitter } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  deviceList: any;
  deviceResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isTableData: boolean = false;
  baseUrl: string = environment.hostUrl;
  showFileUploadSuccess: boolean = false;
  showFileUploadSuccessMessage: string;
  isLoading: boolean = false;

  //ngx options
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  //ngx options

  constructor(private invoiceService: InvoiceService) {
    this.options = { concurrency: 1 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.getDeviceList();
  }


  startUpload(orderId): void {
    this.isLoading = true;
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.baseUrl + '/repairPortal/saveInvoiceDevice',
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
      data: { orderId: orderId }
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
        window.location.reload();
      }
      else {
        this.isLoading = false;
      }
    }
  }

  getDeviceList() {

    let currentUser = localStorage.getItem('currentUser');
    let invoiceObj = {
      "arcId": JSON.parse(currentUser).arcId,
      "countryId": localStorage.getItem("countryId"),
      "orderState": "Device Delivered"
    }

    this.invoiceService.getDeviceList(invoiceObj).subscribe(
      (res) => {

        this.deviceList = res.responseObj;
        this.isTableData = true;
        // document.getElementById('myTable').style.display = 'block';
        this.dtTrigger.next();


      },
      (err) => {

      }
    )
  }

}
