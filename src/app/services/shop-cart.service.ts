import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './../classes/product';

export interface IShopCartServiceData {
    products: Map<number, IProduct>; 
    totalPrice: number;
}

export interface IShopCartService {
    GetShopCartData(): IShopCartServiceData;
    GetProducts(): Map<number, IProduct>;
    AddProduct(product: IProduct): void;
    DelProduct(product: IProduct): boolean;
    GetNumberProducts(): number;
    GetPrice(): number;
    Empty(): void; 
}

export interface ICheckOutDetails {
    name: string;
    address: string;
    postalCode: string;
    county: number;
    district: number;
    country: number;
}

@Injectable()
export class ShopCartService implements IShopCartService { 
    
    private static instance: ShopCartService = null;
    data: IShopCartServiceData = {products: new Map<number, IProduct>(), totalPrice: 0};
    
    private _data: BehaviorSubject<IShopCartServiceData> = new BehaviorSubject<IShopCartServiceData>(this.data);
    $data: Observable<IShopCartServiceData> = this._data.asObservable();

    constructor(){
        if (ShopCartService.instance == null){
            ShopCartService.instance = this;
        }

        return ShopCartService.instance;
    }

    private getProductPrice(product: IProduct): number{
        return product.promotionPrice != undefined ? product.promotionPrice : product.price;
    }

    GetShopCartData(): IShopCartServiceData {
        return this.data;
    }

    GetProducts(): Map<number, IProduct> {
        return this.data.products;
    }

    private round2Decimal(num: number): number {
        num = num * 100;
        num = Math.abs(num);
        num = num / 100;

        return num;
    }

    AddProduct(product: IProduct, quantity: number = 1): void {
        if (!this.data.products.has(product.id)){
            product.quantity = 0;
            this.data.products.set(product.id, product);
        }
        
        this.data.products.get(product.id).quantity += quantity;
        this.data.totalPrice += this.round2Decimal(this.getProductPrice(product)) * quantity;

        this._data.next(this.data);
    }

    DelProduct(product: IProduct): boolean {
        if (this.data.products.has(product.id)){
            product = this.data.products.get(product.id);

            this.data.totalPrice -= this.getProductPrice(product);
            product.quantity--;

            if (product.quantity == 0){
                this.data.products.delete(product.id);
            }

            this._data.next(this.data);

            return true;
        }
        
        return false;
    }

    GetNumberProducts(): number {
        return this.data.products.size;
    }

    GetPrice(): number {
        return this.round2Decimal(this.data.totalPrice);
    }

    CheckOut(details: ICheckOutDetails): Promise<boolean> {
        return Promise.resolve(true);
    }

    Empty(): void {
        this.data.products.clear();
        this.data.totalPrice = 0;
        this._data.next(this.data);
    }
}
