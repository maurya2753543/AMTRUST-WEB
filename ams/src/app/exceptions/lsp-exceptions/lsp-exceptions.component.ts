import { Component, OnInit } from '@angular/core';
import { ExceptionsService } from '../exceptions.service';
import { MatDialog } from '@angular/material';
import { ActionInfoComponent } from '../action-info/action-info.component';

import { Subject } from 'rxjs';
@Component({
  selector: 'app-lsp-exceptions',
  templateUrl: './lsp-exceptions.component.html',
  styleUrls: ['./lsp-exceptions.component.scss']
})
export class LspExceptionsComponent implements OnInit {
  lspExceptionList: any;
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
    this.getLSPExceptions();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  getLSPExceptions() {
    this.isLoading=true;
    this.isTableData=false;
    let obj = { "countryId": localStorage.getItem('countryId'), "errorCode": 112, "startDate": this.convertDate(this.startDate), "endDate": this.convertDate(this.endDate) }
    this.exceptionsService.getLspExceptions(obj).subscribe(
      (res) => {
        
        this.isTableData=true;
        this.isLoading=false;
        this.lspExceptionList = res.response.roList;
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

  dialogInfo(lsp):void{
    let dialogRef = this.dialog.open(ActionInfoComponent, {
      width: '700px',
      data:{
        dialogText:lsp
      }
    });
  }
}
