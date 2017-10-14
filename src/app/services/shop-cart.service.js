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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var ShopCartService = ShopCartService_1 = (function () {
    function ShopCartService() {
        this.data = { products: new Map(), totalPrice: 0 };
        this._data = new BehaviorSubject_1.BehaviorSubject(this.data);
        this.$data = this._data.asObservable();
        if (ShopCartService_1.instance == null) {
            ShopCartService_1.instance = this;
        }
        return ShopCartService_1.instance;
    }
    ShopCartService.prototype.getProductPrice = function (product) {
        return product.promotionPrice != undefined ? product.promotionPrice : product.price;
    };
    ShopCartService.prototype.GetShopCartData = function () {
        return this.data;
    };
    ShopCartService.prototype.GetProducts = function () {
        return this.data.products;
    };
    ShopCartService.prototype.round2Decimal = function (num) {
        num = num * 100;
        num = Math.abs(num);
        num = num / 100;
        return num;
    };
    ShopCartService.prototype.AddProduct = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        if (!this.data.products.has(product.id)) {
            product.quantity = 0;
            this.data.products.set(product.id, product);
        }
        this.data.products.get(product.id).quantity += quantity;
        this.data.totalPrice += this.round2Decimal(this.getProductPrice(product)) * quantity;
        this._data.next(this.data);
    };
    ShopCartService.prototype.DelProduct = function (product) {
        if (this.data.products.has(product.id)) {
            product = this.data.products.get(product.id);
            this.data.totalPrice -= this.getProductPrice(product);
            product.quantity--;
            if (product.quantity == 0) {
                this.data.products.delete(product.id);
            }
            this._data.next(this.data);
            return true;
        }
        return false;
    };
    ShopCartService.prototype.GetNumberProducts = function () {
        return this.data.products.size;
    };
    ShopCartService.prototype.GetPrice = function () {
        return this.round2Decimal(this.data.totalPrice);
    };
    ShopCartService.prototype.CheckOut = function (details) {
        return Promise.resolve(true);
    };
    ShopCartService.prototype.Empty = function () {
        this.data.products.clear();
        this.data.totalPrice = 0;
        this._data.next(this.data);
    };
    return ShopCartService;
}());
ShopCartService.instance = null;
ShopCartService = ShopCartService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ShopCartService);
exports.ShopCartService = ShopCartService;
var ShopCartService_1;
//# sourceMappingURL=shop-cart.service.js.map