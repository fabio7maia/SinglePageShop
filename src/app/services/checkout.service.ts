import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IZone, ICarrierZone, IPaymentMethod } from './../classes/transportations';
import { IBuyData, IBuyConfirmData } from './../classes/checkout';

import { ApiService } from './../services/api.service';

import 'rxjs/add/operator/map';

@Injectable()
export class CheckOutService {

    constructor(private api: ApiService) { }

    getZones(): Observable<IZone[]> {
        return this.api.GetJsonP('api/data/Zone')
            .map(result => result.data);
    }

    getCarriers(zoneId: number): Observable<ICarrierZone[]> {
        return this.api.GetJsonP('api/data/CarrierZone?zoneId=' + zoneId)
            .map(result => result.data);
    }

    getPaymentMethods(): Observable<IPaymentMethod[]> {
        return this.api.GetJsonP('api/data/PaymentMethod')
            .map(result => result.data);
    }

    setBuyDraft(buyData: IBuyData): Observable<IBuyConfirmData>{
        return this.api.Post('api/buyDraft', buyData)
            .map(result => result.data);
    }

    delBuyDraft(buyDraftKey: string): Observable<IBuyConfirmData>{
        return this.api.Post('api/delBuyDraft', {buyDraftKey: buyDraftKey})
            .map(result => result.data);
    }

    setBuy(buyDraftKey: string): Observable<IBuyConfirmData>{
        return this.api.Post('api/buy', {buyDraftKey: buyDraftKey})
            .map(result => result.data);
    }
}
