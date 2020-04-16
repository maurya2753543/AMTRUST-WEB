import { Component, OnInit, Input, Output, EventEmitter, trigger, style, transition, animate } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RepairOrderDetailsComponent } from '../repair-order-details/repair-order-details.component';
import { PendingForDispatchDetailComponent } from '../pending-for-dispatch-detail/pending-for-dispatch-detail.component';
import { PendingForDispatchService } from '../service/pending-for-dispatch.service';
import { PendingForDispatchCaptiveComponent } from '../pending-for-dispatch-captive/pending-for-dispatch-captive.component'
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-pending-for-dispatch',
  templateUrl: './pending-for-dispatch.component.html',
  styleUrls: ['./pending-for-dispatch.component.scss'],
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
export class PendingForDispatchComponent implements OnInit {

  /*declation of input parameter for dashboard items*/
  @Input() public show: boolean;

  @Input() public set changeInPendingForDispatch(val: any) {
    if (typeof val != "undefined") {
      this.ngOnInit();
    }
  }


  @Output()
  changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**Declearation for show hide panel content */
  isToggle: boolean = true;
  deviceResponse: any;
  res: any;
  // awbNo:any;
  // bookedDateTime: any;



  constructor(public dialog: MatDialog, private pendingForDispatchService: PendingForDispatchService) { }

  ngOnInit() {
    this.getPendingForDispatch();
  }

  getPendingForDispatch() {
    let currentUser = localStorage.getItem('currentUser');
    let countryId = localStorage.getItem("countryId")
    let countryName;
    if (countryId == "1") {
      countryName = "India"
    }
    else if (countryId == "2") {
      countryName = "Indonesia"
    }
    else if(countryId == "3"){
      countryName = "Philippines"
    }
    var obj = {
      "arcId": JSON.parse(currentUser).arcId,
      "orderState": "Pending for Dispatch",
      "country": countryName,
      "isDetailView": false
    }
    this.pendingForDispatchService.getPendingForDispatch(obj).subscribe(
      (res) => {

        this.deviceResponse = res.response.roList;
        this.isToggle = !this.isToggle;
        this.changeExpansion.emit(this.isToggle);
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.isToggle = true;
          this.changeExpansion.emit(this.isToggle);
        }, 100);
      },
      (err) => {

      }
    )

  }
  /**
  *Method for toggle show hide
  */
  toggle() {
    this.isToggle = !this.isToggle;
    this.changeExpansion.emit(this.isToggle);
  }

  dispatch(id, logisticsPartner, bookedDateTime, orderState, awbNumber, courierName): void {

    let dialogComponent: any;

    if (logisticsPartner === "captive") {

      dialogComponent = PendingForDispatchCaptiveComponent;
      logisticsPartner = 'Spoors';

    } else if (logisticsPartner === "logicloud") {

      dialogComponent = PendingForDispatchDetailComponent;

    } else {

      dialogComponent = PendingForDispatchCaptiveComponent;
      logisticsPartner = 'LogiCloud';
    }


    // if (orderState.toLowerCase() == "rejected to ams") {
    //   if (logisticsPartner === "captive") {
    //     dialogComponent = PendingForDispatchDetailComponent;
    //   }
    //   else if (logisticsPartner === "logicloud") {
    //     dialogComponent = PendingForDispatchDetailComponent;
    //   }
    //   else {
    //     dialogComponent = PendingForDispatchCaptiveComponent;
    //     logisticsPartner = 'LogiCloud';
    //   }
    // }
    // else {
    //   if (logisticsPartner === "captive") {
    //     dialogComponent = PendingForDispatchCaptiveComponent;
    //     logisticsPartner = 'Spoors';
    //   } else if (logisticsPartner === "logicloud") {
    //     dialogComponent = PendingForDispatchDetailComponent;
    //   } else {
    //     dialogComponent = PendingForDispatchCaptiveComponent;
    //     logisticsPartner = 'LogiCloud';
    //   }
    // }

    let dialogRef = this.dialog.open(dialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        orderId: id,
        logisticsName: logisticsPartner,
        bookedDateTime: bookedDateTime,
        awbNumber: awbNumber,
        message: "dispatchDone",
        courierName: courierName
      }
    });
  }

  // dispatchCaptive(id): void{
  //   let dialogRef = this.dialog.open(PendingForDispatchCaptiveComponent, {
  //     width: '500px',
  //     disableClose: true,
  //     data: { orderId:id }
  //   });
  // }

  print(orderId) {
    debugger
    this.pendingForDispatchService.getPDF(orderId).subscribe(
      (res) => {
        debugger;
        var file = new Blob([res], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        var printWindow = window.open(fileURL);
        printWindow.focus();
        printWindow.print();
      },
      (err) => {

      }
    )
  }

  getRepairOrderDetails(orderId): void {
    let dialogRef = this.dialog.open(RepairOrderDetailsComponent, {
      width: '500px',
      data: { orderID: orderId, message: "dispatchDone" }
    });
  }
}
