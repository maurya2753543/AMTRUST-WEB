import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class PendingEstimationService {

    baseUrl: string = environment.hostUrl;
    constructor(private _http: HttpClient) {
    }

    getModelList(obj):Observable<any>{
        return this._http.post(this.baseUrl + '/repairPortal/getModelsList', obj);
    }
    getPendingEstimation(obj): Observable<any> {  
        return this._http.post(this.baseUrl + '/repairPortal/getPendingEstimation', obj);
    }
    getBOM(obj): Observable<any> {
        return this._http.post(this.baseUrl + '/repairPortal/getBOMTemplate', obj)
    }
    getTaxGroup(obj):Observable<any>{
        
        return this._http.post(this.baseUrl + '/repairPortal/getTaxGroupByCountryId', obj)
    }
    addDevicesForAMS(obj):Observable<any>{
        return this._http.post(this.baseUrl + '/repairPortal/addNewSparePart', obj)
    }
    saveEstimation(obj):Observable<any>{
        return this._http.post(this.baseUrl + '/repairPortal/saveEstimation', obj)
    }
    saveReEstimation(obj):Observable<any>{
        return this._http.post(this.baseUrl + '/repairPortal/saveReEstimation', obj)
    }
    getBOMHistory(obj):Observable<any>{
        return this._http.post(this.baseUrl + '/repairPortal/getBOMHistory', obj)
    }
    getOrderImages(obj):Observable<any>{
        return this._http.post(this.baseUrl + '/repairPortal/getOrderImages', obj)
    }
    deleteImage(obj):Observable<any>{
        return this._http.post(this.baseUrl + '/repairPortal/deleteDeviceImages', obj)
    }
}
