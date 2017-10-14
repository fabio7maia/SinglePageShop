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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var api_service_1 = require("./api.service");
require("rxjs/add/operator/map");
var CompanyService = CompanyService_1 = (function () {
    function CompanyService(api, document) {
        this.api = api;
        this.document = document;
        if (CompanyService_1.instance == null) {
            CompanyService_1.instance = this;
        }
        return CompanyService_1.instance;
    }
    CompanyService.prototype.getCompany = function () {
        return this.api.GetJsonP('api/data/CompanyValue').map(function (result) {
            return result.data[0];
        });
    };
    return CompanyService;
}());
CompanyService.instance = null;
CompanyService.company = null;
CompanyService = CompanyService_1 = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [api_service_1.ApiService, Object])
], CompanyService);
exports.CompanyService = CompanyService;
var CompanyService_1;
//# sourceMappingURL=company.service.js.map