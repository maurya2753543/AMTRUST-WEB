import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatFormFieldControl } from '@angular/material';
import {IMyDpOptions} from '../../../../node_modules/angular4-datepicker/src/my-date-picker';

@Component({
  selector: 'app-client-report-select-date',
  templateUrl: './client-report-select-date.component.html',
  styleUrls: ['./client-report-select-date.component.scss']
})
export class ClientReportSelectDateComponent implements OnInit {
 fromDate: Date;
 toDate:Date;
 public myDatePickerOptions: IMyDpOptions = {
  // other options...
  dateFormat: 'yyyy-mm-dd',
};
public model: any = { date: { year: 2015, month: 10, day: 9 } };
  constructor(public dialogRef: MatDialogRef<ClientReportSelectDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // console.log("data dikah do", data); 
     }

  ngOnInit() {

  }
  submitClick(from, to){
  this.dialogRef.close({
    fromDate:from.formatted,
    toDate:to.formatted})
}
}
