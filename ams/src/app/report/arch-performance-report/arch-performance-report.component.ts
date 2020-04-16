import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service.module';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-arch-performance-report',
  templateUrl: './arch-performance-report.component.html',
  styleUrls: ['./arch-performance-report.component.scss']
})
export class ArchPerformanceReportComponent implements OnInit {

  isLoading: boolean = false;
  startDate: any;
  endDate: any;
  constructor(private reportService: ReportService) { }

  ngOnInit() {
  }

  download() {
    
    let startDate = this.formatDate(this.startDate);
    let endDate = this.formatDate(this.endDate);
    let countryId = localStorage.getItem('countryId');
    let url = environment.analyticHostUrl + '/analyticDetails/createPerformanceExcel/' + countryId + '/' + startDate + '/' + endDate;
    window.open(url);
  }

  formatDate(date) {
    
    var today = new Date(date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var dt = '';
    var mt = ''

    var yyyy = today.getFullYear();

    if (dd < 10) {
      dt = '0' + dd;
    }
    else {
      dt = dd.toString();
    }
    if (mm < 10) {
      mt = '0' + mm;
    }
    else {
      mt = mm.toString();
    }
    return dt + '' + mt + '' + yyyy;
  }
}
