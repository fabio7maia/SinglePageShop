import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './../classes/appSettings';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

export interface IApiServiceError {
    status: string; 
    message: string;
}

export interface IApiServiceResult {
    errors: IApiServiceError[];
    success: boolean;
    data: any;
}

export class ApiServiceSuccess implements IApiServiceResult {
    errors: IApiServiceError[];
    success: boolean;
    data: any;

    constructor(data: any){
        this.data = data;
        this.success = true;
    }
}

export class ApiServiceError implements IApiServiceResult {
    errors: IApiServiceError[];
    success: boolean;
    data: any;

    constructor(errors: IApiServiceError[]){
        this.data = null;
        this.success = false;
        this.errors = errors;
    }
}

@Injectable()
export class ApiService {
    constructor(private http: Http, private jsonp: Jsonp) {}

    private extractData(res: Response) {
        let body = res.json();

        return new ApiServiceSuccess(body || { });
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        let errStatus: string;
        
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errStatus = error.status.toString();
            errMsg = error.statusText.toString();
        } else {
            errMsg = error.message ? error.message : error.toString();
            errStatus = error.status;
        }
        
        return Observable.throw(new ApiServiceError([{status: errStatus, message: errMsg}]));
    }

    GetJsonP(url: string) : Observable<IApiServiceResult>{
        if (url.indexOf('?') >= 0){
            url = AppSettings.WebApiUrl + url + '&callback=JSONP_CALLBACK';
        }else{
            url = AppSettings.WebApiUrl + url + '?callback=JSONP_CALLBACK';
        }

        return this.jsonp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    Post(url: string, data: Object) : Observable<IApiServiceResult>{
        url = AppSettings.WebApiUrl + url ;

        let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
        let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });

        return this.http.post(url, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    Get(url: string) : Observable<IApiServiceResult>{
        url = AppSettings.WebApiUrl + url;

        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
