import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class RepairProgressServiceService {

  baseUrl: string = environment.hostUrlRODetails;
  constructor(private _http: HttpClient) {
  }

  getROPlannedDateHistory(obj): Observable<any>{
    return this._http.post(this.baseUrl+'/repairPortal/getROPlannedDateHistory',obj);
}
}
