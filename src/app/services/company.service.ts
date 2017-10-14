import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';

import { AppSettings } from './../classes/appSettings';
import { ICompany } from './../classes/company';

import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

    private static instance: CompanyService = null;
    private static company: ICompany = null;

    constructor(private api: ApiService, @Inject(DOCUMENT) private document: any){
        if (CompanyService.instance == null){
            CompanyService.instance = this;
        }

        return CompanyService.instance;
    }

    getCompany(): Observable<ICompany>{
        return this.api.GetJsonP('api/data/CompanyValue').map(result => {
            return result.data[0];
        });
    }
}