import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class EstimationApprovalServiceService {

  baseUrl: string = environment.hostUrl;
  baseBOMUrl: string = environment.hostBOMHistoryUrl;
  //baseUrl: string = "http://192.168.3.148:8099";
  constructor(private _http: HttpClient) {
  }

  getPendingForApproval(obj): Observable<any> {  
       
    return this._http.post(this.baseUrl + '/repairEstimation/getDevicesForAMS',obj)
  }

  getImages(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/repairEstimation/getOrderImages' ,obj);
  }

  getReEstimation(obj):Observable<any>{
    return this._http.post(this.baseUrl + '/repairEstimation/getEstimationDetailForAMS' ,obj);
  }

  getEstimateStatus(obj):Observable<any>{
    return this._http.post(this.baseUrl + '/repairEstimation/approveReEstimateStatus' ,obj);
  }

  getBOMHistory(obj):Observable<any>{
    return this._http.post(this.baseBOMUrl+'/repairPortal/getBOMHistory',obj);
  }
}
