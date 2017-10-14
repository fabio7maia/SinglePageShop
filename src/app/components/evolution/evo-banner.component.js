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
var company_service_1 = require("../../services/company.service");
var appSettings_1 = require("./../../classes/appSettings");
var EvoBannerComponent = (function () {
    function EvoBannerComponent(companyService) {
        this.companyService = companyService;
        this.WebApiUrl = appSettings_1.AppSettings.WebApiUrl;
        this.company = null;
        this.companySubscription = null;
    }
    EvoBannerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companySubscription = this.companyService.getCompany().subscribe(function (company) {
            _this.company = company;
        });
    };
    EvoBannerComponent.prototype.ngOnDestroy = function () {
        if (this.companySubscription)
            this.companySubscription.unsubscribe();
    };
    return EvoBannerComponent;
}());
EvoBannerComponent = __decorate([
    core_1.Component({
        //moduleId: module.id,
        selector: 'evo-banner',
        templateUrl: './evo-banner.html',
        providers: [company_service_1.CompanyService]
    }),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], EvoBannerComponent);
exports.EvoBannerComponent = EvoBannerComponent;
//# sourceMappingURL=evo-banner.component.js.map