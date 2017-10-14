import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopCartService } from './../../services/shop-cart.service';
import { IProduct } from './../../classes/product';
import { Subscription } from 'rxjs/Subscription';
import { ProductsService } from './../../services/products.service';
import { AppSettings } from './../../classes/appSettings';

import { AlertService } from './../../services/alert.service';

@Component({
  //moduleId: module.id,
  selector: 'evo-shop-products',
  providers: [ ProductsService, ShopCartService, AlertService ],
  templateUrl: './evo-shop-products.html'
})
export class EvoShopProductsComponent implements OnInit, OnDestroy {

  products: IProduct[];
  categories: string[];
  error: string;
  WebApiUrl: string = AppSettings.WebApiUrl;
  DefaultProductImage: string = AppSettings.DefaultProductImage;

  private subscriptionProducts: Subscription;
  private subscriptionCategories: Subscription;

  constructor(private productsService: ProductsService, private shopCartService: ShopCartService, private alertService: AlertService){}

  GetProducts(): void {
    this.subscriptionProducts = this.productsService.$products.subscribe(data => {
      this.products = data;
    });

    this.subscriptionCategories = this.productsService.$categories.subscribe(data => {
      this.categories = data;
    });

    this.productsService.getProducts();
  }

  ngOnInit(): void {
    this.GetProducts();
  }

  AddProductShopCart(product: IProduct){
    this.shopCartService.AddProduct(product);
    this.alertService.alertSuccessClose(null, "Produto adicionado ao carrinho com sucesso.");
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    if (this.subscriptionProducts) this.subscriptionProducts.unsubscribe();
    if (this.subscriptionProducts) this.subscriptionCategories.unsubscribe();
  }
}
