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
var api_service_1 = require("./../services/api.service");
require("rxjs/add/operator/map");
var CheckOutService = (function () {
    function CheckOutService(api) {
        this.api = api;
    }
    CheckOutService.prototype.getZones = function () {
        return this.api.GetJsonP('api/data/Zone')
            .map(function (result) { return result.data; });
    };
    CheckOutService.prototype.getCarriers = function (zoneId) {
        return this.api.GetJsonP('api/data/CarrierZone?zoneId=' + zoneId)
            .map(function (result) { return result.data; });
    };
    CheckOutService.prototype.getPaymentMethods = function () {
        return this.api.GetJsonP('api/data/PaymentMethod')
            .map(function (result) { return result.data; });
    };
    CheckOutService.prototype.setBuyDraft = function (buyData) {
        return this.api.Post('api/buyDraft', buyData)
            .map(function (result) { return result.data; });
    };
    CheckOutService.prototype.delBuyDraft = function (buyDraftKey) {
        return this.api.Post('api/delBuyDraft', { buyDraftKey: buyDraftKey })
            .map(function (result) { return result.data; });
    };
    CheckOutService.prototype.setBuy = function (buyDraftKey) {
        return this.api.Post('api/buy', { buyDraftKey: buyDraftKey })
            .map(function (result) { return result.data; });
    };
    return CheckOutService;
}());
CheckOutService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], CheckOutService);
exports.CheckOutService = CheckOutService;
//# sourceMappingURL=checkout.service.js.map