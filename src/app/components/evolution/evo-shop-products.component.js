"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shop_cart_service_1 = require("./../../services/shop-cart.service");
var products_service_1 = require("./../../services/products.service");
var appSettings_1 = require("./../../classes/appSettings");
var alert_service_1 = require("./../../services/alert.service");
var EvoShopProductsComponent = (function () {
    function EvoShopProductsComponent(productsService, shopCartService, alertService) {
        this.productsService = productsService;
        this.shopCartService = shopCartService;
        this.alertService = alertService;
        this.WebApiUrl = appSettings_1.AppSettings.WebApiUrl;
        this.DefaultProductImage = appSettings_1.AppSettings.DefaultProductImage;
    }
    EvoShopProductsComponent.prototype.GetProducts = function () {
        var _this = this;
        this.subscriptionProducts = this.productsService.$products.subscribe(function (data) {
            _this.products = data;
        });
        this.subscriptionCategories = this.productsService.$categories.subscribe(function (data) {
            _this.categories = data;
        });
        this.productsService.getProducts();
    };
    EvoShopProductsComponent.prototype.ngOnInit = function () {
        this.GetProducts();
    };
    EvoShopProductsComponent.prototype.AddProductShopCart = function (product) {
        this.shopCartService.AddProduct(product);
        this.alertService.alertSuccessClose(null, "Produto adicionado ao carrinho com sucesso.");
    };
    EvoShopProductsComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        if (this.subscriptionProducts)
            this.subscriptionProducts.unsubscribe();
        if (this.subscriptionProducts)
            this.subscriptionCategories.unsubscribe();
    };
    return EvoShopProductsComponent;
}());
EvoShopProductsComponent = __decorate([
    core_1.Component({
        //moduleId: module.id,
        selector: 'evo-shop-products',
        providers: [products_service_1.ProductsService, shop_cart_service_1.ShopCartService, alert_service_1.AlertService],
        templateUrl: './evo-shop-products.html'
    }),
    __metadata("design:paramtypes", [products_service_1.ProductsService, shop_cart_service_1.ShopCartService, alert_service_1.AlertService])
], EvoShopProductsComponent);
exports.EvoShopProductsComponent = EvoShopProductsComponent;
//# sourceMappingURL=evo-shop-products.component.js.map