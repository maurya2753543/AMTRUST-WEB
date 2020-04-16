import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Subject } from 'rxjs';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
@Component({
  selector: 'app-invoice-download',
  templateUrl: './invoice-download.component.html',
  styleUrls: ['./invoice-download.component.scss']
})
export class InvoiceDownloadComponent implements OnInit {

  isTableData: boolean = true;
  claimId: any;
  imageResponse:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.dtTrigger.next();
  }

  
  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  getInvoice() {
    this.isTableData=false;
    let obj = {
      "claimNo": this.claimId
    }
    this.invoiceService.getUploadedInvoices(obj).subscribe(
      (res) => {
        this.imageResponse=res.responseObj;
        this.dtTrigger.next();
        this.isTableData=true;
      },
      (err) => {

      }
    )
  }
}
