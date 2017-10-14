import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IShopCartServiceData, ShopCartService } from './../../services/shop-cart.service';
import { IProduct } from './../../classes/product';

import { AlertService } from './../../services/alert.service';

@Component({
  //moduleId: module.id,
  selector: 'evo-shop-cart',
  providers: [ShopCartService, AlertService],
  templateUrl: './evo-shop-cart.html'
})
export class EvoShopCartComponent implements OnInit, OnDestroy {
    shopCartData: IShopCartServiceData = {products: new Map<number, IProduct>(), totalPrice: 0};
    subscriptionShopCart: Subscription;

  constructor(private shopCartService: ShopCartService, private alertService: AlertService){}

  ngOnInit(): void {
    this.subscriptionShopCart = this.shopCartService.$data.subscribe(data => {
      this.shopCartData = data;
    });
  }

  EmptyShopCart(){
    this.shopCartService.Empty();
    this.alertService.alertSuccessClose(null, "O Carrinho foi limpo com sucesso.");
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    if (this.subscriptionShopCart) this.subscriptionShopCart.unsubscribe();
  }
}
