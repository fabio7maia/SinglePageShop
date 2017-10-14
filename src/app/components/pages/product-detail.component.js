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
var router_1 = require("@angular/router");
var products_service_1 = require("./../../services/products.service");
var shop_cart_service_1 = require("./../../services/shop-cart.service");
var appSettings_1 = require("./../../classes/appSettings");
var alert_service_1 = require("./../../services/alert.service");
var ProductComponent = (function () {
    function ProductComponent(productsService, shopCartService, route, alertService) {
        this.productsService = productsService;
        this.shopCartService = shopCartService;
        this.route = route;
        this.alertService = alertService;
        this.quantity = 1;
        this.WebApiUrl = appSettings_1.AppSettings.WebApiUrl;
        this.DefaultProductImage = appSettings_1.AppSettings.DefaultProductImage;
    }
    // Load data ones componet is ready
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptionProducts = this.productsService.$products.subscribe(function (data) {
            _this.product = data[0];
        });
        // Subscribe to route params
        this.subscriptionRoute = this.route.params.subscribe(function (params) {
            var id = params['id'];
            // Retrieve Product with Id route param
            _this.productsService.getProductById(id);
        });
    };
    ProductComponent.prototype.ngAfterViewInit = function () {
        $('.flexslider').flexslider({
            animation: "slide",
            controlNav: "thumbnails"
        });
    };
    ProductComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        if (this.subscriptionRoute)
            this.subscriptionRoute.unsubscribe();
        if (this.subscriptionProducts)
            this.subscriptionProducts.unsubscribe();
    };
    ProductComponent.prototype.AddProductShopCart = function () {
        this.shopCartService.AddProduct(this.product, this.quantity);
        this.alertService.alertSuccessClose(null, "Produto adicionado ao carrinho com sucesso.");
    };
    ProductComponent.prototype.decreaseQuantity = function () {
        if (this.quantity > 1)
            this.quantity--;
    };
    ProductComponent.prototype.increaseQuantity = function () {
        this.quantity++;
    };
    return ProductComponent;
}());
ProductComponent = __decorate([
    core_1.Component({
        //moduleId: module.id,
        providers: [products_service_1.ProductsService, alert_service_1.AlertService],
        templateUrl: './product-detail.html'
    }),
    __metadata("design:paramtypes", [products_service_1.ProductsService, shop_cart_service_1.ShopCartService, router_1.ActivatedRoute, alert_service_1.AlertService])
], ProductComponent);
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product-detail.component.js.map