import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

    baseUrl: string = environment.loginUrl;
    constructor(private _http: HttpClient) {
    }

    login(obj){
        return this._http.post(this.baseUrl + '/userPortal/getPermissionList',obj)
    }
}
