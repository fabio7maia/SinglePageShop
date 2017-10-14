import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProductsService } from './../../services/products.service';
import { ShopCartService } from './../../services/shop-cart.service';
import { AppSettings } from './../../classes/appSettings';
import { IProduct } from './../../classes/product';
import { AlertService } from './../../services/alert.service';

declare var $: any;

@Component({
  //moduleId: module.id,
  providers: [ProductsService, AlertService],
  templateUrl: './product-detail.html'
})
export class ProductComponent implements OnInit, OnDestroy, AfterViewInit { 
    private subscriptionRoute: Subscription;
    product: IProduct;
    private subscriptionProducts: Subscription;

    quantity: number = 1;

  WebApiUrl: string = AppSettings.WebApiUrl;
  DefaultProductImage: string = AppSettings.DefaultProductImage;

  constructor(private productsService: ProductsService, private shopCartService: ShopCartService, private route: ActivatedRoute, private alertService: AlertService){

  }

  // Load data ones componet is ready
  ngOnInit() {
      this.subscriptionProducts = this.productsService.$products.subscribe(data => {
          this.product = data[0];
      });

      // Subscribe to route params
      this.subscriptionRoute = this.route.params.subscribe(params => {

        let id = params['id'];

        // Retrieve Product with Id route param
        this.productsService.getProductById(id);
    });
  }

  ngAfterViewInit(){
    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: "thumbnails"
    });
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    if (this.subscriptionRoute) this.subscriptionRoute.unsubscribe();
    if (this.subscriptionProducts) this.subscriptionProducts.unsubscribe();
  }

  AddProductShopCart(){
    this.shopCartService.AddProduct(this.product, this.quantity);
    this.alertService.alertSuccessClose(null, "Produto adicionado ao carrinho com sucesso.");
  }

  decreaseQuantity(){
    if (this.quantity > 1) this.quantity--;
  }

  increaseQuantity(){
    this.quantity++;
  }
}
