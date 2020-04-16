import { Component, OnInit } from '@angular/core';
import { ExceptionsService } from '../exceptions.service';
import { MatDialog } from '@angular/material';
import { ActionInfoComponent } from '../action-info/action-info.component';
import { Subject } from 'rxjs';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-arc-exceptions',
  templateUrl: './arc-exceptions.component.html',
  styleUrls: ['./arc-exceptions.component.scss']
})
export class ArcExceptionsComponent implements OnInit {
  arcExceptionList: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  startDate: any;
  endDate: any;
  isLoading:boolean=false;
  isTableData:boolean=true;
  constructor(private exceptionsService: ExceptionsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setDate(this.endDate.getDate() - 30);
    this.getArcExceptions();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  getArcExceptions() {
    this.isLoading=true;
    this.isTableData=false;
    let obj = { "countryId": localStorage.getItem('countryId'), "errorCode": 110, "startDate": this.convertDate(this.startDate), "endDate": this.convertDate(this.endDate) }
    this.exceptionsService.getArcExceptions(obj).subscribe(
      (res) => {
        
        this.isTableData=true;
        this.isLoading=false;
        this.arcExceptionList = res.response.roList;
        this.dtTrigger.next();
      },
      (err) => {
        
        this.isLoading=false;
      }
    )
  }

  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  }

  dialogInfo(arc):void{
    console.log("arc",arc);
    let dialogRef = this.dialog.open(ActionInfoComponent, {
      width: '700px',
      data:{
        dialogText:arc
      }
    });
  }
}
