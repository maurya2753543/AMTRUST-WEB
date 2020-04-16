import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RepairOrderDetailsServiceService } from '../../services/repair-order-details-service.service'
@Component({
  selector: 'app-repair-order-details',
  templateUrl: './repair-order-details.component.html',
  styleUrls: ['./repair-order-details.component.scss']
})
export class RepairOrderDetailsComponent implements OnInit {
  repairOrderDetails: any;
  customerDetails: any;
  noCustDetails:boolean=false;
  damageDtls:any;
  res:any;

  constructor(private repairOrderDetailsServiceService : RepairOrderDetailsServiceService,
    public dialogRef: MatDialogRef<RepairOrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


ngOnInit(){
  this.getRepairOrderDetails();
}

getRepairOrderDetails() {
  var obj = {
    "orderId": this.dialogRef._containerInstance._config.data.orderId
  }
  console.log("oredrID",obj.orderId);
  this.repairOrderDetailsServiceService.getRODetails(obj).subscribe(
    (res) => {
      
      this.res= res;

      if(typeof this.res.response.customerInfo[0]=="undefined"){
        this.noCustDetails=true;
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
