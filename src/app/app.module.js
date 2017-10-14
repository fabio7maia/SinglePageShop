"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var evo_app_component_1 = require("./components/evolution/evo-app.component");
var evo_banner_component_1 = require("./components/evolution/evo-banner.component");
var evo_shop_products_component_1 = require("./components/evolution/evo-shop-products.component");
var evo_shop_cart_component_1 = require("./components/evolution/evo-shop-cart.component");
var home_component_1 = require("./components/pages/home.component");
var product_detail_component_1 = require("./components/pages/product-detail.component");
var about_component_1 = require("./components/pages/about.component");
var contacts_component_1 = require("./components/pages/contacts.component");
var checkout_component_1 = require("./components/pages/checkout.component");
var page_not_found_component_1 = require("./components/pages/page-not-found.component");
var api_service_1 = require("./services/api.service");
var products_service_1 = require("./services/products.service");
var checkout_service_1 = require("./services/checkout.service");
var shop_cart_service_1 = require("./services/shop-cart.service");
var mapToIterable_pipe_1 = require("./pipes/mapToIterable.pipe");
var toDecimal_pipe_1 = require("./pipes/toDecimal.pipe");
var app_routes_1 = require("./app.routes");
var _1 = require("@agm/core/");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, http_1.JsonpModule, app_routes_1.routing,
            _1.AgmCoreModule.forRoot({
                apiKey: 'AIzaSyCHHslkJd1OiiMNteBzQFqi2p-q2dr7p-Q'
            })],
        declarations: [evo_app_component_1.EvoAppComponent, evo_banner_component_1.EvoBannerComponent, evo_shop_products_component_1.EvoShopProductsComponent, evo_shop_cart_component_1.EvoShopCartComponent,
            home_component_1.HomeComponent, product_detail_component_1.ProductComponent, checkout_component_1.CheckOutComponent, about_component_1.AboutComponent, contacts_component_1.ContactsComponent, page_not_found_component_1.PageNotFoundComponent, mapToIterable_pipe_1.MapToIterablePipe, toDecimal_pipe_1.ToDecimalPipe],
        providers: [api_service_1.ApiService, products_service_1.ProductsService, checkout_service_1.CheckOutService, shop_cart_service_1.ShopCartService],
        //bootstrap:    [ EvoPageHeadComponent, EvoBannerComponent, EvoShopProductsComponent ]
        bootstrap: [evo_app_component_1.EvoAppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map