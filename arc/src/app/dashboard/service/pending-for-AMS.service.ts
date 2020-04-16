import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class PendingForAMSService {

    baseUrl: string = environment.hostUrl;
    //baseUrl1:string = "http://192.168.2.87:8020";

    constructor(private _http: HttpClient) {
    }

    getPendingForAMS(obj): Observable<any> {  
      
        return this._http.post(this.baseUrl + '/repairPortal/getPendingForApproval',obj)
    }

    getEstimationAmountDetails(obj): Observable<any>{
        
        return this._http.post(this.baseUrl+'/repairPortal/getEstimationDetail',obj);

    }

    getDisputedDetails(obj):Observable<any>{

        return this._http.post(this.baseUrl+'/repairPortal/getDisputeDetails',obj);
    
    }
}

