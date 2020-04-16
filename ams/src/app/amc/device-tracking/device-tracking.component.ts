import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DispatchDeviceServiceService } from '../../services/dispatch-device-service.service';
@Component({
  selector: 'app-device-tracking',
  templateUrl: './device-tracking.component.html',
  styleUrls: ['./device-tracking.component.scss']
})
export class DeviceTrackingComponent implements OnInit {
  deviceTrackingResponse: any;
  isLoading: boolean = false;
  constructor(public dialogRef: MatDialogRef<DeviceTrackingComponent>, private dispatchDeviceServiceService: DispatchDeviceServiceService, @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    this.dispatchDeviceServiceService.getLiveTraking(obj).subscribe(
      (res) => {
        this.isLoading = false;
        this.deviceTrackingResponse = res;
      },
      (err) => {

      }
    )
  }

}
