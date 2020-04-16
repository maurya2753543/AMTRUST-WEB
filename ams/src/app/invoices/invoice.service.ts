import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class InvoiceService {

    baseUrl: string = environment.hostUrl;
    constructor(private _http: HttpClient) {
    }

    getDeviceList(obj):Observable<any>{      
        return this._http.post(environment.arcHostURL + '/repairPortal/invoiceDevices',obj)
    }
    getUploadedInvoices(obj):Observable<any>{        
        return this._http.post(environment.arcHostURL + '/repairPortal/getInvoiceImages',obj)
    }
}
