import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class DeviceDispatchedService {

    baseUrl: string = environment.hostUrl;
    constructor(private _http: HttpClient) {
    }

    getDeviceDispatched(obj){ 
        return this._http.post(this.baseUrl + '/repairPortal/getDispatchedDevice',obj)
    }
}
