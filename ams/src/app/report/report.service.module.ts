
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class ReportService {

  baseUrl: string = environment.analyticHostUrl;

  constructor(private _http: HttpClient) {
  }

  download(countryId,startDate,endDate): Observable<any> {
    return this._http.get(this.baseUrl + '/analyticDetails/createPerformanceExcel/' + countryId + '/' + startDate + '/' + endDate);
  }

}


