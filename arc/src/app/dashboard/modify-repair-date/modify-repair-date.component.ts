import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { RepairInProgressService } from '../service/repair-in-progress.service';
import { MessageService } from '../service/message.service';
// import { AddSparePartComponent } from '../add-spare-part/add-spare-part.component';

@Component({
  selector: 'app-modify-repair-date',
  templateUrl: './modify-repair-date.component.html',
  styleUrls: ['./modify-repair-date.component.scss']
})
export class ModifyRepairDateComponent implements OnInit {
  newDate: any;
  comments: any;
  showSuccess: boolean=false;
  isLoading:boolean=false;
  successMessage:any;
  constructor(private messageService: MessageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModifyRepairDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private repairInProgressService: RepairInProgressService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateDate() {
    this.isLoading=true;
    let formData: FormData = new FormData();
    formData.append('orderId', this.dialogRef._containerInstance._config.data.orderId);
    formData.append('plannedDate', moment(this.newDate).format("DD/MM/YYYY"));
    formData.append('comments', this.comments);

    this.repairInProgressService.updatePlannedDate(formData).subscribe(
      (res) => {
    
        if(res.responseCode=="200"){
          this.isLoading = false;
          this.successMessage = res.response.plannedDate;
          this.showSuccess = true;
          let element: HTMLElement = document.getElementById('cancelButton') as HTMLElement;
        element.click();
        this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);  
        }   
      },
      (err) => {
        this.isLoading = false;
        let element: HTMLElement = document.getElementById('cancelButton') as HTMLElement;
        element.click();
        this.messageService.sendMessage(this.dialogRef._containerInstance._config.data.message);  
      }
    )
  }



  ngOnInit() {

  }

}






