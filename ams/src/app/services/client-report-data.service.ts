import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

@Injectable()
export class ClientReportDataService {
  baseUrl: string = environment.hostUrl;
 
  constructor(private _http: HttpClient) {
  }

  getClientReportData(obj):Observable<any>{
    return this._http.post(this.baseUrl+"/repairEstimation/getClaimDetailsReport",obj)
  }

  getSpareReportData(obj):Observable<any>{
    return this._http.post(this.baseUrl+"/repairEstimation/getSparePartReport",obj)
  }

}