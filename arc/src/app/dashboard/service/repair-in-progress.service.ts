import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class RepairInProgressService {

    baseUrl: string = environment.hostUrl;
    constructor(private _http: HttpClient) {
    }

    getRepairInProgress(obj): Observable<any> {  
        return this._http.post(this.baseUrl + '/repairPortal/getRepairInProgress',obj)
    }

    getQCTaskNames(): Observable<any>{
        return this._http.get(this.baseUrl + '/picklist/getQCTaskNames');
    }

    updatePlannedDate(obj):Observable<any>{
        return this._http.post(this.baseUrl + '/repairPortal/updatePlannedDate',obj)
    }

    getROPlannedDateHistory(obj): Observable<any>{
        return this._http.post(this.baseUrl+'/repairPortal/getROPlannedDateHistory',obj);
    }
}
