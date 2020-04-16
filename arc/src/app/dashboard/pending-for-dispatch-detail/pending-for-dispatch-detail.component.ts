import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PendingForDispatchService } from '../service/pending-for-dispatch.service';
import { DeviceInTransitService } from '../service/device-in-transit.service';
import { environment } from '../../../environments/environment';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { MessageService } from '../service/message.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
	selector: 'app-pending-for-dispatch-detail',
	templateUrl: './pending-for-dispatch-detail.component.html',
	styleUrls: ['./pending-for-dispatch-detail.component.scss'],
	// providers:[DatePipe]
})
export class PendingForDispatchDetailComponent implements OnInit {

	baseUrl = environment.hostUrl;
	response: any;
	res: any;
	customerInfoRes: any = [];
	courierCompanyValue: any;
	AWBNumber: any;
	dispatchDate: any;
	deliveryDate: any;
	comments: any;
	isLoading: boolean = false;
	showFileUploadSuccessMessage: any;
	showFileUploadSuccess: boolean = false;
	selfObj = {};
	amTrustObj = {};
	othersObj={};
	//ngx options
	options: UploaderOptions;
	formData: FormData;
	files: UploadFile[];
	uploadInput: EventEmitter<UploadInput>;
	humanizeBytes: Function;
	PODFile: any;
	//ngx options

	constructor(private datePipe:DatePipe, private messageService: MessageService, private pendingForDispatchService: PendingForDispatchService,
		public dialogRef: MatDialogRef<PendingForDispatchDetailComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any, private deviceInTransitService: DeviceInTransitService
	) {
		this.options = { concurrency: 1 };
		this.files = []; // local uploading files array
		this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
		this.humanizeBytes = humanizeBytes;
	}

	disableSubmit() {
		if (this.courierCompanyValue == 'Self Pickup' || this.courierCompanyValue == 'Self Deliver') {
			if (!this.AWBNumber || !this.dispatchDate || !this.deliveryDate || !this.comments || !this.PODFile) {
				return true;
			}
		}
		else {
			if (!this.AWBNumber || !this.dispatchDate || !this.deliveryDate || !this.comments) {
				return true;
			}
		}
	}

	getRODetail() {

		var obj = {
			"orderId": this.dialogRef._containerInstance._config.data.orderId
		}
		this.deviceInTransitService.getRODetails(obj).subscribe(
			(res) => {
				this.res = res;
				for (let i = 0; i < this.res.response.customerInfo.length; i++) {
					if (this.res.response.customerInfo[i].addressType == "dispatch address") {
						this.customerInfoRes.push(this.res.response.customerInfo[i]);
						break;
					}
				}

			},
			(err) => {

			}
		)
	}

	submitDispatch() {
		this.initializeAmtrustObj();
		this.pendingForDispatchService.submitDispatchAmtrust(this.amTrustObj).subscribe(
			(res) => {
debugger;
				if (!res.isError) {
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

	submitDispatchForOthers(){
		
		this.isLoading = true;
		this.initializeOthersObj();
		this.pendingForDispatchService.submitDispatchOthers(this.othersObj).subscribe(
			(res) => {
			debugger;
				if (res.responseMsg=="success") {
					this.onNoClick();
					this.messageService.sendMessage('dispatchDone');
				}
				else {

				}
			},
			(err) => {

			}
		)
		
	}

	startUpload(): void {
		this.isLoading = true;
		if (this.courierCompanyValue == 'Self Pickup' || this.courierCompanyValue == 'Self Deliver') {
			this.initializeSelfObj();
			const event: UploadInput = {
				type: 'uploadAll',
				url: this.baseUrl + '/repairPortal/dispatchDetails',
				method: 'POST',
				headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
				data: { dispatchDetailRequest: JSON.stringify(this.selfObj) }
			};

			this.uploadInput.emit(event);
		}

	}

	onUploadOutput(output: UploadOutput): void {

		this.files.push(output.file);
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
				let element: HTMLElement = document.getElementById('cancelButton') as HTMLElement;
				element.click();
				this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);
			}
		}
	}

	initializeSelfObj() {
		this.selfObj = {
			"awbNumber": this.AWBNumber,
			"courierCompany": this.courierCompanyValue,
			"dispatchedDate": moment(this.dispatchDate).format("DD/MM/YYYY HH:mm"),
			"deliveryDate": moment(this.deliveryDate).format("DD/MM/YYYY HH:mm"),
			"dispatchAddress": this.customerInfoRes[0].addressOne + this.customerInfoRes[0].addressTwo,
			"city": this.customerInfoRes[0].city,
			"provinceState": this.customerInfoRes[0].state,
			"pincode": this.customerInfoRes[0].pinCode,
			"country": this.customerInfoRes[0].country,
			"comment": this.comments,
			"orderId": this.dialogRef._containerInstance._config.data.orderId

		}
	}

	initializeAmtrustObj() {
		this.amTrustObj = {
			"awp": this.AWBNumber,
			"couriesCompany": this.courierCompanyValue,
			"dispatchedDate": moment(this.dispatchDate).format("DD/MM/YYYY HH:mm"),
			"deliveryDate": moment(this.deliveryDate).format("DD/MM/YYYY HH:mm"),
			"type": "dispatch address",
			"address": this.customerInfoRes[0].addressOne + this.customerInfoRes[0].addressTwo,
			"city": this.customerInfoRes[0].city,
			"state": this.customerInfoRes[0].state,
			"pincode": this.customerInfoRes[0].pinCode,
			"country": this.customerInfoRes[0].country,
			"workSpecExternalId": "3381",
			"orderId": this.dialogRef._containerInstance._config.data.orderId

		}
		debugger;
	}
	
	initializeOthersObj(){
		this.dispatchDate=moment(this.dispatchDate).format("DD/MM/YYYY HH:mm");
		this.othersObj = {
			"CustomerID": "",
			"countryName":localStorage.getItem("countryId"),
			"UserName": "",
			"password": "",
			"documents": [{
						"lsp": this.courierCompanyValue,
						"docketNo":  this.AWBNumber,
						"address": this.customerInfoRes[0].addressOne ,
						"city": this.customerInfoRes[0].city,
						"state": this.customerInfoRes[0].state,
						"pincode": this.customerInfoRes[0].pinCode,
						"country": this.customerInfoRes[0].country,
						"dispatchDate": this.dispatchDate,
						"shipmentType": "F",
						"comments":this.comments,
						"orderNo":  this.dialogRef._containerInstance._config.data.orderId
			}]
		}
	}
	

	getCourierCompany() {
		let formData: FormData = new FormData();
		let id = localStorage.getItem("countryId");
		formData.append("countryId", id);
		this.pendingForDispatchService.getCourierName(formData).subscribe(
			(res) => {
				this.response = res.responseObj;
			}
		)
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
		this.getCourierCompany();
		this.getRODetail();
	}

}
