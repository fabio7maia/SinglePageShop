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
var product_1 = require("./../classes/product");
var api_service_1 = require("./../services/api.service");
require("rxjs/add/operator/map");
var ProductsService = ProductsService_1 = (function () {
    function ProductsService(api) {
        this.api = api;
        this.$products = new BehaviorSubject_1.BehaviorSubject([]);
        this.$categories = new BehaviorSubject_1.BehaviorSubject([]);
        this.dataStore = {
            products: [],
            categories: []
        };
        this.loaded = false;
        if (ProductsService_1.instance == null) {
            ProductsService_1.instance = this;
        }
        return ProductsService_1.instance;
    }
    ProductsService.prototype.getCategories = function (products) {
        var lastCategory = '';
        var categories = [];
        products.forEach(function (element) {
            if (lastCategory != element.categoryId) {
                categories.push(element.categoryId);
                lastCategory = element.categoryId;
            }
        });
        return categories;
    };
    ProductsService.prototype.loadData = function () {
        var _this = this;
        this.api.GetJsonP('api/data/Product')
            .subscribe(function (data) {
            if (data.success) {
                _this.dataStore.products = data.data;
                _this.dataStore.categories = _this.getCategories(_this.dataStore.products);
                _this.loaded = true;
                _this.$products.next(Object.assign({}, _this.dataStore).products);
                _this.$categories.next(Object.assign({}, _this.dataStore).categories);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ProductsService.prototype.getProducts = function () {
        this.loadData();
    };
    ProductsService.prototype.getProductById = function (id) {
        if (!this.loaded) {
            this.loadData();
        }
        var product;
        for (var i = 0; i < this.dataStore.products.length; i++) {
            product = this.dataStore.products[i];
            if (product['id'] == id) {
                break;
            }
            else {
                product = new product_1.Product();
            }
        }
        this.$products.next([product]);
    };
    return ProductsService;
}());
ProductsService.instance = null;
ProductsService = ProductsService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ProductsService);
exports.ProductsService = ProductsService;
var ProductsService_1;
//# sourceMappingURL=products.service.js.map