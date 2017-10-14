import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { EvoAppComponent }  from './components/evolution/evo-app.component';
import { EvoBannerComponent }  from './components/evolution/evo-banner.component';
import { EvoShopProductsComponent }  from './components/evolution/evo-shop-products.component';
import { EvoShopCartComponent }  from './components/evolution/evo-shop-cart.component';

import { HomeComponent }  from './components/pages/home.component';
import { ProductComponent }  from './components/pages/product-detail.component';
import { AboutComponent }  from './components/pages/about.component';
import { ContactsComponent }  from './components/pages/contacts.component';
import { CheckOutComponent }  from './components/pages/checkout.component';
import { PageNotFoundComponent }  from './components/pages/page-not-found.component';

import { ApiService }  from './services/api.service';
import { ProductsService }  from './services/products.service';
import { CheckOutService }  from './services/checkout.service';
import { ShopCartService }  from './services/shop-cart.service';

import { MapToIterablePipe } from './pipes/mapToIterable.pipe';
import { ToDecimalPipe } from './pipes/toDecimal.pipe';

import { routing } from './app.routes';

import { AgmCoreModule } from '@agm/core/';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, JsonpModule, routing, 
    AgmCoreModule.forRoot({
        apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    })],
  declarations: [ EvoAppComponent, EvoBannerComponent, EvoShopProductsComponent, EvoShopCartComponent, 
    HomeComponent, ProductComponent, CheckOutComponent, AboutComponent, ContactsComponent, PageNotFoundComponent, MapToIterablePipe, ToDecimalPipe ],
  providers: [ ApiService, ProductsService, CheckOutService, ShopCartService ],
  //bootstrap:    [ EvoPageHeadComponent, EvoBannerComponent, EvoShopProductsComponent ]
  bootstrap: [ EvoAppComponent ]
})
export class AppModule { }
