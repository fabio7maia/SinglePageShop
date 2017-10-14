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
var alert_service_1 = require("./../../services/alert.service");
var EvoShopCartComponent = (function () {
    function EvoShopCartComponent(shopCartService, alertService) {
        this.shopCartService = shopCartService;
        this.alertService = alertService;
        this.shopCartData = { products: new Map(), totalPrice: 0 };
    }
    EvoShopCartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptionShopCart = this.shopCartService.$data.subscribe(function (data) {
            _this.shopCartData = data;
        });
    };
    EvoShopCartComponent.prototype.EmptyShopCart = function () {
        this.shopCartService.Empty();
        this.alertService.alertSuccessClose(null, "O Carrinho foi limpo com sucesso.");
    };
    EvoShopCartComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        if (this.subscriptionShopCart)
            this.subscriptionShopCart.unsubscribe();
    };
    return EvoShopCartComponent;
}());
EvoShopCartComponent = __decorate([
    core_1.Component({
        //moduleId: module.id,
        selector: 'evo-shop-cart',
        providers: [shop_cart_service_1.ShopCartService, alert_service_1.AlertService],
        templateUrl: './evo-shop-cart.html'
    }),
    __metadata("design:paramtypes", [shop_cart_service_1.ShopCartService, alert_service_1.AlertService])
], EvoShopCartComponent);
exports.EvoShopCartComponent = EvoShopCartComponent;
//# sourceMappingURL=evo-shop-cart.component.js.map