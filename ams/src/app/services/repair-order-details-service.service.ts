import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RepairOrderDetailsServiceService {

  baseUrl: string = environment.hostUrlRODetails;
  //baseUrl: string = 'http://54.169.128.62:8020'
    constructor(private _http: HttpClient) {
    }



  getRODetails(orderIdObj) {
    return this._http.post(this.baseUrl + '/repairPortal/getRoDetails', orderIdObj)
  }
}
