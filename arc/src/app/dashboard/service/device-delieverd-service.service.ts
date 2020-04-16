import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
@Injectable()
export class DeviceDelieverdServiceService {

  baseUrl: string = environment.hostUrlDeviceDelivered;

  constructor(private _http: HttpClient) {
  }

  getDeviceDeliveredReport(obj): Observable<any>{
    return this._http.post(this.baseUrl+'/repairEstimation/getDeviceReportForAMS',obj);
  }
}
