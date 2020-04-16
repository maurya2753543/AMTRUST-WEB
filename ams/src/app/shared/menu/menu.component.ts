import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import { ClientReportDataService } from '../../services/client-report-data.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { MatDialog } from '@angular/material';
import { ClientReportSelectDateComponent } from '../client-report-select-date/client-report-select-date.component'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  fromDate:any;
  toDate:any;

  constructor(private router: Router,
    private clientReportDataService: ClientReportDataService,
    public dialog: MatDialog) {}

  /*declation of input parameter for dashboard items*/
  @Input() public dashboard: object;
  showReportMenu: boolean = true;
  showEXCMenu:boolean=true;
  activeTab : any;
  currentUser: any;
  claimRes:any;
  isLoading: boolean = false;
  countryId:any=localStorage.getItem('countryId')
  /*Declaration of output parameter for download file*/
  @Output()
  change: EventEmitter<object> = new EventEmitter<object>();
  
  
  
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
  }
  toggle() {
    if (!this.showReportMenu) {
      this.showReportMenu = true;
    } else {
      this.showReportMenu = false;
    }
  }
  toggleEXC(){
    if (!this.showEXCMenu) {
      this.showEXCMenu = true;
    } else {
      this.showEXCMenu = false;
    }
  }
  dashboardItemsChanged(): void {
    this.change.emit(this.dashboard);
  }
  getSpareReportData(fromDate, toDate) {

    this.isLoading = true;
    let obj = {
      "countryId": this.countryId,
      "fromDate": fromDate + " 00:00:00",
      "toDate": toDate + " 00:00:00"
    }
    this.clientReportDataService.getSpareReportData(obj).subscribe(
      (res) => {

        this.isLoading = false
        this.claimRes = res;
        if (this.countryId == 1)
          this.downloadspareReportsInd()
        else if(this.countryId == 2)
        this.downloadspareReportsInd()
        else if(this.countryId == 3)
        this.downloadspareReportsInd()

      }
    )
  }
  getClientReportData(fromDate,toDate){
    
    this.isLoading = true;
    let obj = {
      "countryId" : this.countryId,
      "fromDate" : fromDate+" 00:00:00",
      "toDate" : toDate+" 00:00:00"
    }
    this.clientReportDataService.getClientReportData(obj).subscribe(
      (res)=>{
        
        this.isLoading = false
        this.claimRes = res;
        if(this.countryId==1)
          this.downloadReportsInd()
          else if(this.countryId == 2)
          this.downloadReportsIndo()
          else if(this.countryId == 3)
          this.downloadReportsIndo()
        
      }
    )
  }

  downloadReportsIndo(){
    let responseArr = this.claimRes.responseObj, internalArr = [], externalArr = [], orderDate;
    for (let result of responseArr) {
      if(!result.errorMsg)
      result.errorMsg="N/A"
      internalArr = [];
      internalArr.push(result.orderId);
      internalArr.push(result.claimNo);
      internalArr.push(result.orderState);
      internalArr.push(result.orderDate);
      internalArr.push(result.awbNo);
      internalArr.push(result.errorMsg);
      externalArr.push(internalArr);
    }
    var options = {
      headers: ['Order Id', 'Claim No.', 'Order State','Order Date', 'AWB No', 'Error Message']
    };
    new Angular2Csv(externalArr, 'Client Detail Report', options);
  }



  downloadReportsInd(){
    let responseArr = this.claimRes.responseObj, internalArr = [], externalArr = [], orderDate;
    for (let result of responseArr) {
      internalArr = [];
      internalArr.push(this.countryId)
      internalArr.push(result.orderId);
      internalArr.push(result.claimNo);
      internalArr.push(result.orderState);
      internalArr.push(result.orderDate);
      internalArr.push('-'+result.awbNo+'-');
      // internalArr.push("null");
      internalArr.push(result.claimType);
      internalArr.push(result.customerName);
      internalArr.push(result.brand);
      internalArr.push(result.model);
      internalArr.push('-'+result.imei+'-');
      internalArr.push(result.address);
      internalArr.push(result.city);
      internalArr.push(result.state);
      internalArr.push(result.pincode);
      internalArr.push(result.claimStatus);
      internalArr.push(result.claimDate);
      internalArr.push(result.arcName);
      internalArr.push(result.recievedDate);
      internalArr.push(result.estimatedDate);
      internalArr.push(result.estimatedAmount);
      internalArr.push(result.partName1);
      internalArr.push(result.partname2);
      internalArr.push(result.partName3);
      internalArr.push(result.partPrice1);
      internalArr.push(result.partPrice2);
      internalArr.push(result.partPrice3);
      internalArr.push(result.labourCharges);
      internalArr.push(result.sparePartTotalAmount);
      internalArr.push(result.totalRepairAmount);
      internalArr.push(result.amsApproveDate);
      internalArr.push(result.approvalType);
      internalArr.push(result.totalRepairAmount);
      internalArr.push(result.repairStatus);
      internalArr.push(result.repairCompletionDate);
      internalArr.push(result.arcPincode);
      internalArr.push(result.arcCity);
      internalArr.push(result.arcState);
      internalArr.push(result.lspName);
      externalArr.push(internalArr);
    }
    var options = {
      headers: ['Country Id','Order Id', 'Claim No', 'Order State', 'Order Date', 'AWB No', 'Claim Type', 'Customer Name','Brand','Model', 'IMEI No', 'Address',
      'City','State','Pincode', 'Claim Status', 'Claim Date','ARC Name', 'Recieved Date', 'Estimated Date', 'Estimated Amount', 'Part 1 Name','Part 2 Name', 'Part 3 Name','Part 1 Price',
      'Part 2 Price','Part 3 Price', 'Labour Charges', 'Spare Part Total Amount', 'Total Repair Amount', 'AMS Approve Date','Approval Type', 'AMS Approval Amount','Repair Status', 'Repair Completion Date',
     'ArcPincode','ArcCity','ArcState','Lspname' ]
    };
    new Angular2Csv(externalArr, 'Claim Detail Report', options);

  }

  downloadspareReportsInd() {
    let responseArr = this.claimRes.responseObj, internalArr = [], externalArr = []
    for (let result of responseArr) {
      internalArr = [];
      internalArr.push(result.claimNo!=null?result.claimNo:"NA");
      internalArr.push(result.claimType!=null?result.claimType:" ");
      internalArr.push(result.brand!=null?result.model:" ");
      internalArr.push(result.model!=null?result.brand:" ");
      internalArr.push(result.arcName!=null?result.arcName:" ");
      internalArr.push('-' + result.imei + '-');
      internalArr.push(result.claimDate!=null?result.claimDate:" ");
      internalArr.push(result.estimatedDate!=null?result.estimatedDate:" ");
      internalArr.push(result.partName1!=null?result.partName1:" ");
      internalArr.push(result.part1Code!=null?result.part1Code:" ");
      internalArr.push(result.partPrice1!=null?result.partPrice1:" ");
      internalArr.push(result.partname2!=null?result.partname2:" ");
      internalArr.push(result.part2Code!=null?result.part2Code:" ");
      internalArr.push(result.partPrice2!=null?result.partPrice2:" ");
      internalArr.push(result.partName3!=null?result.partName3:" ");
      internalArr.push(result.part3Code!=null?result.part3Code:" ");
      internalArr.push(result.partPrice3!=null?result.partPrice3:" ");
      internalArr.push(result.partName4!=null?result.partName4:" ");
      internalArr.push(result.part4Code!=null?result.part4Code:" ");
      internalArr.push(result.partPrice4!=null?result.partPrice4:" ");
      internalArr.push(result.labourCharges!=null?result.labourCharges:" ");
      internalArr.push(result.totalTax!=null?result.totalTax:" ");
      internalArr.push(result.totalRepairAmount!=null?result.totalRepairAmount:" ");
      externalArr.push(internalArr);
    }
    var options = {
      headers: [
        'Claim No',
        'Claim Type',
        'Brand',
        'Model',
        'ARC name',
        'IMEI No',
        'Claim Date',
        'Estimated Date',
        'Part 1 Name',
        'Part 1 Code',
        'Part 1 cost (without Tax)',
        'Part 2 Name',
        'Part 2 Code',
        'Part 2 cost (without Tax)',
        'Part 3 Name',
        'Part 3 Code',
        'Part 3 cost (without Tax)',
        'Part 4 Name',
        'Part 4 Code',
        'Part 4 cost (without Tax)',
        'Labour Charges',
        'Total Tax',
        'Total Repair Amount']
    };
    new Angular2Csv(externalArr, 'Spare Part Report', options);

  }


  specifyDateForReport(): void {
    let dialogRef = this.dialog.open(ClientReportSelectDateComponent, {
      width: '600px',
      height: '300px',
      data: {
        header: 'Claim'
      }
    });
    
    dialogRef.afterClosed().subscribe(
      (result) => {
        this.fromDate = result.fromDate;
        this.toDate = result.toDate;
        this.getClientReportData(this.fromDate,this.toDate)
      }
    )
  }

  spareDateForReport(): void {
    let dialogRef = this.dialog.open(ClientReportSelectDateComponent, {
      width: '600px',
      height: '300px',
      data: {
        header: 'Spare'
      }
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        this.fromDate = result.fromDate;
        this.toDate = result.toDate;
        this.getSpareReportData(this.fromDate, this.toDate)
      }
    )
  }
  
}
