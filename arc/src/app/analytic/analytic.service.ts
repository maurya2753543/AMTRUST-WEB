
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class AnalyticService {

  baseUrl: string = environment.analyticHostUrl;

  constructor(private _http: HttpClient) {
  }

  getCityLocation(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/analyticPicklist/CityLocations', obj);
  }

  getMobileBrandName(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/analyticPicklist/brandNames', obj);
  }

  getBrandModelList(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/analyticPicklist/modelList', obj);
  }

  getEstimatedTATCalculation(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/analyticDetails/estimatedTATCalculation', obj);
  }

  getEstimateDetail(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/analyticDetails/estimatedTATDetails', obj);
  }

  getRepairTATCalculation(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/analyticDetails/repairTATCalculation', obj);
  }

  getRepairTATDetails(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/analyticDetails/repairTATDetails', obj);
  }

  
  getApprovalTATCalculation(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/analyticDetails/approvalTATCalculation', obj);
  }

  getApprovalTATDetails(obj):Observable<any>{
    return this._http.post(this.baseUrl + '/analyticDetails/approvalTATDetails', obj);
  }

  getDispatchTATCalculation(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/analyticDetails/dispatchTATCalculation', obj);
  }

  getDispatchDetail(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/analyticDetails/dispatchTATDetails', obj);
  }
}


