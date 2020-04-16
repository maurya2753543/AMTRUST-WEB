import { Injectable } from '@angular/core';
import { environment} from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DispatchDeviceServiceService {

  baseUrl: string = environment.hostUrl;
  // baseUrl1: string = "http://192.168.2.233:8099";

  constructor(private _http: HttpClient) {
  }
  
  getDispatchDeviceReport(obj):Observable<any>{
    return this._http.post(this.baseUrl+'/repairEstimation/disputeDevices',obj);
  }

  getDispatchStatus(obj):Observable<any>{
    return this._http.post(this.baseUrl+'/repairEstimation/disputeStatus',obj)
  }

  getLiveTraking(obj):Observable<any>{
    return this._http.post(environment.trackURL + '/logistic/trackConsignment', obj)
}

}
