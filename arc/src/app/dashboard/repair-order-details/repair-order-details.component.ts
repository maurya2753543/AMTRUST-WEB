import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeviceInTransitService } from '../service/device-in-transit.service';

@Component({
  selector: 'app-repair-order-details',
  templateUrl: './repair-order-details.component.html',
  styleUrls: ['./repair-order-details.component.scss']
})
export class RepairOrderDetailsComponent {

  repairOrderDetails: any;
  customerDetails: any;
  noCustDetails: boolean = false;
  damageDtls: any;
  res: any;
  customerInfoRes:any=[];
  constructor(
    public dialogRef: MatDialogRef<RepairOrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private deviceInTransitService: DeviceInTransitService
  ) { }

  ngOnInit() {
    this.getRepairOrderDetails();
  }
  getRepairOrderDetails() {

    var obj = {
      "orderId": this.dialogRef._containerInstance._config.data.orderID
    }
    console.log("orderID from obj",obj.orderId);
    this.deviceInTransitService.getRODetails(obj).subscribe(
      (res) => {
        this.res = res;
        console.log("res RO",res)
        for (let i = 0; i < this.res.response.customerInfo.length; i++) {
          if(this.res.response.customerInfo[i].addressType=="dispatch address"){
            this.customerInfoRes.push(this.res.response.customerInfo[i]);
            break;
          }       
        }
        if (typeof this.res.response.customerInfo[0] == "undefined") {
          this.noCustDetails = true;
        }
      },
      (err) => {

      }
    )
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
