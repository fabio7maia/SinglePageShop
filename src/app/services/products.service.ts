import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IProduct, Product } from './../classes/product';
import { ApiService } from './../services/api.service';

import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {

    private static instance: ProductsService = null;
    
    public $products: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
    public $categories: BehaviorSubject<string[]> = new BehaviorSubject([]);
    private dataStore: {
        products: IProduct[],
        categories: string[]
    } = {
        products: [],
        categories: []
    }

    private loaded: boolean = false;

    constructor(private api: ApiService) {
        if (ProductsService.instance == null){
            ProductsService.instance = this;
        }

        return ProductsService.instance;
    }

    private getCategories(products: IProduct[]): string[]{
        let lastCategory = '';
        let categories: string[] = [];

        products.forEach(element => {
            if (lastCategory != element.categoryId){
                categories.push(element.categoryId);

                lastCategory = element.categoryId;
            }
        });

        return categories;
    }

    loadData(): void {
        this.api.GetJsonP('api/data/Product')
            .subscribe(data => {
                if (data.success){
                    this.dataStore.products = data.data;
                    this.dataStore.categories = this.getCategories(this.dataStore.products);
                    this.loaded = true;

                    this.$products.next(Object.assign({}, this.dataStore).products);
                    this.$categories.next(Object.assign({}, this.dataStore).categories);
                }
            }, error => {
                console.log(error);
            });
    }

    getProducts(): void {
        this.loadData();
    }

    getProductById(id: number): void {

        if (!this.loaded){
            this.loadData();
        }

        let product: IProduct;
        
        for(let i=0; i < this.dataStore.products.length; i++){
            product = this.dataStore.products[i];
            if (product['id'] == id){
                break;
            }else{
                product = new Product();
            }
        }

        this.$products.next([product]);
    }
}
