import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class PendingForDispatchService {

    baseUrl: string = environment.hostUrl;
    amtrustDispatchHostURL:string=environment.amtrustDispatchHostURL;
    constructor(private _http: HttpClient) {
    }
    getPDF(orderId): Observable<any>
    {
        return this._http.get(environment.hostUrl + '/repairPortal/generateLabel/' + orderId + '/' + localStorage.getItem('countryId'),{responseType:'arraybuffer'})
    }

    getPendingForDispatch(obj): Observable<any> {  
       
        return this._http.post(this.baseUrl + '/repairPortal/getPendingForDispatch',obj)
    }

    getCourierName(obj):Observable<any>{
        return this._http.post(this.baseUrl+'/picklist/getLSBList',obj)
    }

    submitDispatchAmtrust(obj):Observable<any>{
        return this._http.post(this.amtrustDispatchHostURL+'/logistic/produceSpoorsTickets',obj);
    }

    submitDispatchOthers(obj):Observable<any>{
        return this._http.post(this.amtrustDispatchHostURL+'/logistic/forwardShipment',obj);
    }

    submitCaptiveDispatch(obj): Observable<any>{
        //return this._http.post('http://192.168.2.150:8070/logistic/updateDispatchDetails',obj);
        return this._http.post(this.amtrustDispatchHostURL+'/logistic/updateDispatchDetails',obj);
    }
}
