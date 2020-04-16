import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeviceInTransitService } from '../service/device-in-transit.service';
@Component({
  selector: 'app-device-tracking',
  templateUrl: './device-tracking.component.html',
  styleUrls: ['./device-tracking.component.scss']
})
export class DeviceTrackingComponent implements OnInit {
  deviceTrackingResponse: any;
  isLoading: boolean = false;
  constructor(public dialogRef: MatDialogRef<DeviceTrackingComponent>, private deviceInTransitService: DeviceInTransitService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
     
    var item = this.dialogRef._containerInstance._config.data.item;
    this.getTrackingDetails(item);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTrackingDetails(item) {
    this.isLoading = true;
    let obj = {
      "LSP": item.courierName,
      "DocumentNo": item.awbNo
    }
    this.deviceInTransitService.getLiveTraking(obj).subscribe(
      (res) => {
        debugger;
        
        this.deviceTrackingResponse = res;
        this.isLoading = false;
      },
      (err) => {

      }
    )
  }

}
