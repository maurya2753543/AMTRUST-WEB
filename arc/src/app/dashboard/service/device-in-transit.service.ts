import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class DeviceInTransitService {

    baseUrl: string = environment.hostUrl;
    constructor(private _http: HttpClient) {
    }

    getPortalList(): Observable<any> {  
        return this._http.get(this.baseUrl + '/userPortal/getPortalList');
    }
    
    getDeviceInTransit(obj): Observable<any> {
        return this._http.post(this.baseUrl + '/repairPortal/getDeviceInTransit', obj)
    }

    getRODetails(orderIdObj) {
        return this._http.post(this.baseUrl + '/repairPortal/getRoDetails', orderIdObj)
    }

    deviceReceived(orderId): Observable<any> {
        return this._http.post(this.baseUrl + '/repairPortal/devicereceived?orderid='+orderId, orderId)
    }

    getDisputeDetails():Observable<any>{
        return this._http.get(this.baseUrl + '/picklist/getDisputeDetails'); 
    }

    submitDispute(obj):Observable<any>{
        return this._http.post(this.baseUrl + '/repairPortal/saveDispute', obj)
    }

    getReEstimationDetails(obj):Observable<any>{
        return this._http.post(this.baseUrl + '/repairPortal/getReEstimationDetails', obj)
    }
    getLiveTraking(obj):Observable<any>{
        return this._http.post(environment.trackURL + '/logistic/trackConsignment', obj)
    }
    uploadDispute(obj):Observable<any>{
        return this._http.post(this.baseUrl+ '/repairPortal/saveDisputewithoutMultipart', obj)
    }
}
