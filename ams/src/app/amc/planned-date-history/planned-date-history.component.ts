import { Component, OnInit, Inject } from '@angular/core';
import { RepairProgressServiceService} from '../../services/repair-progress-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-planned-date-history',
  templateUrl: './planned-date-history.component.html',
  styleUrls: ['./planned-date-history.component.scss']
})
export class PlannedDateHistoryComponent implements OnInit {
dateResponse: any;
  constructor(public dialogRef: MatDialogRef<PlannedDateHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private repairInProgressService: RepairProgressServiceService) { }

  ngOnInit() {
    this.getPlannedDateHistory();
  }
  getPlannedDateHistory(){
    console.log("planned history")
    var obj = {
       "orderId":this.dialogRef._containerInstance._config.data.orderId
      //"orderId":"273"
    }
    
    this.repairInProgressService.getROPlannedDateHistory(obj).subscribe(
      (res)=>{
        this.dateResponse = res.response.plannedDateHistory;
      }
    )
}
onNoClick(): void {
  this.dialogRef.close();
}
}
