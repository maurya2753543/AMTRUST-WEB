import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class ArcListServiceService {

  baseUrl: string = environment.hostUrl;
  // baseUrl1: string = "http://192.168.2.120:8099";

  constructor(private _http: HttpClient) {
  }

  getARCPartner(obj): Observable<any>{

    return this._http.post(this.baseUrl+'/approval/getArcPartner',obj);
  }

  getFilterBy(): Observable<any>{
    return this._http.get(this.baseUrl+'/repairEstimation/getOrderStates');
  }

  getFilterReport(obj): Observable<any>{
    return this._http.post(this.baseUrl+'/repairEstimation/getDeviceReportForAMS',obj);
  }

  getPDF(obj):Observable<any>{
    return this._http.get(environment.arcHostURL + '/repairPortal/generatePdf/'+ obj.orderId + '/' + obj.countryId)
  }
}
