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
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var EvoAppComponent = (function () {
    function EvoAppComponent(companyService, titleService, router) {
        var _this = this;
        this.companyService = companyService;
        this.titleService = titleService;
        this.router = router;
        this.currentRoute = '';
        this.WebApiUrl = appSettings_1.AppSettings.WebApiUrl;
        this.IsAnalyticsActive = appSettings_1.AppSettings.IsAnalyticsActive;
        this.company = null;
        this.companySubscription = null;
        if (this.IsAnalyticsActive) {
            router.events.subscribe(function (route) {
                var newRoute = router.url;
                if (newRoute !== _this.currentRoute) {
                    ga('send', 'pageview', newRoute);
                    _this.currentRoute = newRoute;
                }
            });
        }
    }
    EvoAppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companySubscription = this.companyService.getCompany().subscribe(function (company) {
            _this.company = company;
            // define title of page
            if (_this.company.title.length > 0) {
                _this.titleService.setTitle(_this.company.title);
            }
        });
    };
    EvoAppComponent.prototype.ngOnDestroy = function () {
        if (this.companySubscription)
            this.companySubscription.unsubscribe();
    };
    return EvoAppComponent;
}());
EvoAppComponent = __decorate([
    core_1.Component({
        //moduleId: module.id,
        selector: 'evo-app',
        templateUrl: './evo-app.html',
        providers: [company_service_1.CompanyService, platform_browser_1.Title]
    }),
    __metadata("design:paramtypes", [company_service_1.CompanyService, platform_browser_1.Title, router_1.Router])
], EvoAppComponent);
exports.EvoAppComponent = EvoAppComponent;
//# sourceMappingURL=evo-app.component.js.map