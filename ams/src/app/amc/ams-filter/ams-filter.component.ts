import { Component, OnInit, Input, Output, EventEmitter, trigger, style, transition, animate } from '@angular/core';
import * as moment from 'moment';
import { Sort } from '@angular/material';
import { NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material';
import { RepairOrderDetailsComponent } from '../repair-order-details/repair-order-details.component';
import { EstimationAmountComponent } from '../estimation-amount/estimation-amount.component';
// import { DeviceInTransitDisputeComponent } from '../device-in-transit-dispute/device-in-transit-dispute.component';
import { ArcListServiceService } from '../../services/arc-list-service.service'
import { DeviceTrackingComponent } from '../device-tracking/device-tracking.component';
import { PlannedDateHistoryComponent } from '../planned-date-history/planned-date-history.component';
import { environment } from '@env/environment';
 

@Component({
    selector: 'app-ams-filter',
    templateUrl: './ams-filter.component.html',
    styleUrls: ['./ams-filter.component.scss'],
    animations: [
        trigger(
            'isToggle', [
                transition(':enter', [
                    style({ 'height': '0', 'opacity': '0' }),
                    animate('200ms linear', style({ 'height': '*', 'opacity': '1' }))
                ]),
                transition(':leave', [
                    style({ 'height': '*', 'opacity': '1' }),
                    animate('200ms linear', style({ 'height': '0', 'opacity': '0' })
                    )])
            ]
        )
    ]
})
export class AMSFilterComponent implements OnInit {

    showDateTime: boolean = true;
    showIMEI: boolean = false;
    showName: boolean = false;
    showClaim: boolean = false;
    showContactNumber: boolean = false;
    response: any;
    arcResponse: any;
    filterResponse: any;
    showSuccess: boolean = false;
    isLoading: boolean = false;
    successMessage: any;
    noData: string;
    obj: any;
    formattedFromDate: any;
    formattedToDate: any;
    showTable: boolean = false;
    //filterCaseData="RO Pending for Progress"

    /*declation of input parameter for dashboard items*/
    @Input() public show: boolean;

    @Output()
    changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**Declearation for show hide panel content */
    isToggle: boolean = true;
    filterCaseData = '';


    sortedData;
    arcName = '0';
    arcId = '';
    filterCase = '';

    constructor(private arcListServiceService: ArcListServiceService, public dialog: MatDialog) { }

    ngOnInit() {
        //this.sortedData = this.data;
        //this.sortData({ active: "claimDate", direction: "asc" });
        this.getARCList();
        this.getFilterList();
    }

    downloadPDF(orderId) { 
        let tURL=  environment.arcHostURL+'/repairPortal/generatePdf/';
        window.open(tURL + orderId + '/' + localStorage.getItem('countryId'));
    }


    trackAWB(item) {
        let dialogRef = this.dialog.open(DeviceTrackingComponent, {
            width: '500px',
            data: { item: item }
        });
    }

    getARCList() {
        let formData: FormData = new FormData();
        let id = localStorage.getItem("countryId");
        formData.append("countryId", id);

        this.arcListServiceService.getARCPartner(formData).subscribe(
            (res) => {
                if (res.responseCode == "200") {
                    this.isLoading = false;
                    this.arcResponse = res.responseObj;
                    this.showSuccess = true;

                }

            },
            (err) => {
                this.isLoading = false;
                // setTimeout(() => {
                //   window.location.reload();
                // }, 2000);
            }

        )


    }

    getFilterList() {
        this.arcListServiceService.getFilterBy().subscribe(
            (res) => {
                if (res.responseCode == "200") {
                    this.filterResponse = res.responseObj;
                }
            }
        )
    }


    // sortData(sort: Sort) {
    //   const data = this.data.slice();
    //   if (!sort.active || sort.direction == '') {
    //     this.sortedData = data;
    //     return;
    //   }
    //   this.sortedData = data.sort((a, b) => {
    //     let isAsc = sort.direction == 'asc';
    //     switch (sort.active) {
    //       case 'claimDate': return this.compareETA(a.claimDate, b.claimDate, isAsc);
    //       default: return 0;
    //     }
    //   });
    // }

    initializeValues(val) {
        if (typeof val == "undefined") {
            return "";
        }
        else {
            return val;
        }
    }

    submitClick(fromDate, toDate, arcId, filterBy) {
        
        fromDate = this.initializeValues(fromDate)
        toDate = this.initializeValues(toDate)
        arcId = this.initializeValues(arcId)
        filterBy = this.initializeValues(filterBy)

        if (typeof fromDate == "undefined") {

        }
        if (filterBy == "") {

            this.noData = "Please select a filter."
            this.filterCaseData = "No Data";

        } else {
            this.noData = ""
            
            if (fromDate == "" && toDate == "" && arcId == "") {
                this.obj = {
                    "orderState": filterBy,
                    "isDetailView": true
                }
            } else if (fromDate == "" && toDate == "" || arcId == "") {
                if (fromDate == "" && toDate == "") {
                    this.obj = {
                        "arcId": arcId,
                        "orderState": filterBy,
                        "isDetailView": true
                    }
                } else {
                    this.formattedFromDate = moment(fromDate).format('DD/MM/YYYY');
                    this.formattedToDate = moment(toDate).format('DD/MM/YYYY');
                    this.obj = {
                        "orderState": filterBy,
                        "startDate": this.formattedFromDate,
                        "endDate": this.formattedToDate,
                        "isDetailView": true
                    }
                }
            } else if (fromDate > toDate) {
                this.noData = "'To Date' should be greater than 'From Date'"
                this.filterCaseData = "No Data";
            } else {
                this.formattedFromDate = moment(fromDate).format('DD/MM/YYYY');
                this.formattedToDate = moment(toDate).format('DD/MM/YYYY');
                this.obj = {
                    "arcId": arcId,
                    "orderState": filterBy,
                    "startDate": this.formattedFromDate,
                    "endDate": this.formattedToDate,
                    "isDetailView": true
                }
            }
            this.arcListServiceService.getFilterReport(this.obj).subscribe(
                (res) => {
                    this.response = res;
                    this.showTable = true;
                    if (this.response.responseCode == '200') {
                        this.filterCaseData = filterBy;
                        this.response = res.responseObj;

                    }
                    else {
                        this.filterCaseData = 'No Data';
                        this.noData = "No Data found for your search";
                    }
                }
            )

        }
    }

    compareETA(a, b, isAsc) {
        return (((new Date(a)).getTime() < (new Date(b)).getTime()) ? -1 : 1) * (isAsc ? 1 : -1);
    }

    getRepairOrderDetails(orderId): void {
        let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
            width: '500px',
            data: { "orderId": orderId }
        });
    }

    getAmountDetails(): void {
        let dialogRef = this.dialog.open(EstimationAmountComponent, {
            width: '700px',
            data: { name: 'test' }
        });
    }

    filter() {
        this.filterCaseData = this.filterCase;
        console.log(this.filterCase)
    }
    
    toggle() {
        this.isToggle = !this.isToggle;
        this.changeExpansion.emit(this.isToggle);
    }

    getDateHistory(orderId) {
        let dialogRef = this.dialog.open(PlannedDateHistoryComponent, {
          width: '500px',
          //disableClose:true,
          data: { orderId: orderId }
        });
      }
}