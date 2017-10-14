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
var checkout_service_1 = require("./../../services/checkout.service");
var appSettings_1 = require("./../../classes/appSettings");
var CheckOutComponent = (function () {
    function CheckOutComponent(shopCartService, checkoutService) {
        this.shopCartService = shopCartService;
        this.checkoutService = checkoutService;
        this.shipPrice = 0;
        this.isClickButton = false;
        this.WebApiUrl = appSettings_1.AppSettings.WebApiUrl;
        this.DefaultProductImage = appSettings_1.AppSettings.DefaultProductImage;
        this.buy = null;
        this.confirmBuy = null;
        this.alerts = [];
        this.errors = [];
        this.step = -1;
        this.steps = [
            {
                number: 2,
                name: '1',
                description: 'Dados Pessoais'
            },
            {
                number: 3,
                name: '2',
                description: 'Envio'
            },
            {
                number: 4,
                name: '3',
                description: 'Pagamento'
            },
            {
                number: 5,
                name: '4',
                description: 'Confirmação'
            }
        ];
    }
    CheckOutComponent.prototype.initBuyAndConfirmBuy = function () {
        this.buy = {
            personalInformation: {
                name: null,
                nif: null,
                address: null,
                address2: null,
                postalCode: null,
                phone: null,
                aditionalInformation: null,
                email: null
            },
            ship: {
                name: null,
                address: null,
                address2: null,
                postalCode: null,
                phone: null,
                aditionalInformation: null,
                zoneId: null,
                zone: null,
                carrierId: null,
                carrier: null,
                carrier_price: null,
                carrier_min_days: null,
                carrier_max_days: null
            },
            paymentMethod: {
                paymentMethodId: null,
                paymentMethod: null
            },
            products: []
        };
        this.confirmBuy = {
            personalInformation: {
                name: null,
                nif: null,
                address: null,
                address2: null,
                postalCode: null,
                phone: null,
                aditionalInformation: null,
                email: null
            },
            ship: {
                name: null,
                address: null,
                address2: null,
                postalCode: null,
                phone: null,
                aditionalInformation: null,
                zoneId: null,
                zone: null,
                carrierId: null,
                carrier: null,
                carrier_price: null,
                carrier_min_days: null,
                carrier_max_days: null
            },
            paymentMethod: {
                paymentMethodId: null,
                paymentMethod: null
            },
            products: [],
            buyDraftKey: null
        };
    };
    CheckOutComponent.prototype.defineButtons = function () {
        this.buttons = [];
        if (this.step == 1) {
            this.buttons[0] = {
                type: "submit",
                label: "Encomendar",
                class: "item_add hvr-skew-backward",
                fn: 'NextStep'
            };
        }
        else if (this.step == 4) {
            this.buttons[0] = {
                type: "button",
                label: "Voltar",
                class: "item_add hvr-skew-backward",
                fn: 'PreviousStep'
            };
            this.buttons[1] = {
                type: "submit",
                label: "Finalizar Encomenda",
                class: "item_add hvr-skew-backward",
                fn: 'Buy'
            };
        }
        else {
            this.buttons[0] = {
                type: "button",
                label: "Voltar",
                class: "item_add hvr-skew-backward",
                fn: 'PreviousStep'
            };
            this.buttons[1] = {
                type: "submit",
                label: "Seguinte",
                class: "item_add hvr-skew-backward",
                fn: 'NextStep'
            };
        }
    };
    CheckOutComponent.prototype.getCssClassFormStep = function (stepForm) {
        if (stepForm == this.step)
            return 'active';
        else
            return 'disabled';
    };
    CheckOutComponent.prototype.isShipSelectedValid = function () {
        var isValid = true;
        if (this.buy.ship.zoneId != null) {
            //this.zones.forEach(zone => {
            for (var i = 0; i < this.zones.length; i++) {
                var zone = this.zones[i];
                if (zone.id == this.buy.ship.zoneId && zone.ship == 'Sim' && this.buy.ship.carrierId == null) {
                    isValid = null;
                }
            }
            //});
        }
        return isValid;
    };
    CheckOutComponent.prototype.verifyBuyIsValid = function () {
        this.isBuyValid = true;
        // necessário colocar a nulo pois apenas verifica se está definido, pois a validação é required
        if (this.shopCartData.products.size == 0)
            this.isBuyValid = null;
        if (!this.isShipSelectedValid())
            this.isBuyValid = null;
    };
    CheckOutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initBuyAndConfirmBuy();
        this.subscriptionShopCart = this.shopCartService.$data.subscribe(function (data) {
            _this.shopCartData = data;
            if (_this.shopCartData.products.size > 0)
                _this.step = 1;
            _this.verifyBuyIsValid();
        });
        this.defineButtons();
        this.getZones();
        this.getPaymentMethods();
    };
    CheckOutComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        if (this.subscriptionShopCart)
            this.subscriptionShopCart.unsubscribe();
        if (this.subscriptionZones)
            this.subscriptionZones.unsubscribe();
        if (this.subscriptionCarriers)
            this.subscriptionCarriers.unsubscribe();
    };
    CheckOutComponent.prototype.ngOnChanges = function () {
        this.verifyBuyIsValid();
    };
    CheckOutComponent.prototype.getZones = function () {
        var _this = this;
        this.subscriptionZones = this.checkoutService.getZones().subscribe(function (zones) {
            _this.zones = zones;
        });
    };
    CheckOutComponent.prototype.removeCarrier = function () {
        this.shopCartData.totalPrice -= this.shipPrice;
        this.shipPrice = 0;
        this.buy.ship.carrierId = null;
    };
    CheckOutComponent.prototype.UpdateTotalPriceWithShipPrice = function (carrier) {
        if (this.buy.ship.carrierId != null) {
            this.removeCarrier();
        }
        else {
            this.shopCartData.totalPrice += carrier.price;
            this.shipPrice = carrier.price;
            this.buy.ship.carrierId = carrier.id;
            carrier.selected = true;
        }
    };
    CheckOutComponent.prototype.SetPaymentMethodSelected = function (paymentMethod) {
        this.buy.paymentMethod.paymentMethodId = paymentMethod.id;
    };
    CheckOutComponent.prototype.getCarriers = function () {
        var _this = this;
        this.removeCarrier();
        this.subscriptionCarriers = this.checkoutService.getCarriers(this.buy.ship.zoneId).subscribe(function (carriers) {
            _this.carriers = carriers;
            _this.carriers.forEach(function (carrier) {
                carrier.selected = false;
            });
        });
    };
    CheckOutComponent.prototype.getPaymentMethods = function () {
        var _this = this;
        this.checkoutService.getPaymentMethods().subscribe(function (paymentMethods) {
            _this.paymentMethods = paymentMethods;
        });
    };
    CheckOutComponent.prototype.DelProduct = function (product) {
        this.shopCartService.DelProduct(product);
    };
    CheckOutComponent.prototype.onSubmit = function () { };
    CheckOutComponent.prototype.NextStep = function () {
        this.step++;
        this.defineButtons();
        if (this.step == 3) {
            this.buy.ship.address = this.buy.personalInformation.address;
            this.buy.ship.address2 = this.buy.personalInformation.address2;
            this.buy.ship.aditionalInformation = this.buy.personalInformation.aditionalInformation;
            this.buy.ship.name = this.buy.personalInformation.name;
            this.buy.ship.phone = this.buy.personalInformation.phone;
            this.buy.ship.postalCode = this.buy.personalInformation.postalCode;
        }
    };
    CheckOutComponent.prototype.PreviousStep = function () {
        this.step--;
        this.defineButtons();
    };
    CheckOutComponent.prototype.definePersonalInfomartionShip = function () {
        this.buy.ship.address = this.buy.personalInformation.address;
        this.buy.ship.address2 = this.buy.personalInformation.address2;
        this.buy.ship.aditionalInformation = null;
        this.buy.ship.name = this.buy.personalInformation.name;
        this.buy.ship.phone = this.buy.personalInformation.phone;
        this.buy.ship.postalCode = this.buy.personalInformation.postalCode;
    };
    CheckOutComponent.prototype.Buy = function () {
        var _this = this;
        if (!this.isClickButton) {
            this.isClickButton = true;
            this.buy.products = [];
            this.shopCartData.products.forEach(function (product) {
                _this.buy.products.push({
                    productId: product.id,
                    quantity: product.quantity
                });
            });
            this.definePersonalInfomartionShip();
            this.checkoutService.setBuyDraft(this.buy)
                .subscribe(function (data) {
                if (data.success) {
                    _this.confirmBuy = data.data;
                    _this.showBuyConfirmation();
                }
                else {
                    _this.errors = data.errors;
                    // remover o preço de envio
                    _this.removeCarrier();
                    _this.showErrors();
                }
                _this.isClickButton = false;
            });
        }
    };
    CheckOutComponent.prototype.showBuyConfirmation = function () {
        this.step = 100;
    };
    CheckOutComponent.prototype.showErrors = function () {
        this.step = 0;
    };
    CheckOutComponent.prototype.resetErrorsAndAlerts = function () {
        this.errors = [];
        this.alerts = [];
    };
    CheckOutComponent.prototype.finishBuy = function () {
        this.shopCartService.Empty();
        this.initBuyAndConfirmBuy();
        this.step = 0;
    };
    CheckOutComponent.prototype.cancelBuy = function () {
        var _this = this;
        if (!this.isClickButton) {
            this.isClickButton = true;
            this.resetErrorsAndAlerts();
            this.checkoutService.delBuyDraft(this.confirmBuy.buyDraftKey).subscribe(function (data) {
                _this.alerts[0] = 'Compra cancelada com sucesso';
                _this.finishBuy();
                _this.isClickButton = false;
            });
        }
    };
    CheckOutComponent.prototype.confirmBuyFn = function () {
        var _this = this;
        if (!this.isClickButton) {
            this.isClickButton = true;
            this.resetErrorsAndAlerts();
            this.checkoutService.setBuy(this.confirmBuy.buyDraftKey).subscribe(function (data) {
                if (data.success) {
                    _this.alerts[0] = 'Compra efetuada com sucesso';
                }
                else {
                    _this.errors[0] = data.errors[0];
                }
                _this.finishBuy();
                _this.isClickButton = false;
            });
        }
    };
    return CheckOutComponent;
}());
CheckOutComponent = __decorate([
    core_1.Component({
        //moduleId: module.id,
        providers: [shop_cart_service_1.ShopCartService, checkout_service_1.CheckOutService],
        templateUrl: './checkout.html'
    }),
    __metadata("design:paramtypes", [shop_cart_service_1.ShopCartService, checkout_service_1.CheckOutService])
], CheckOutComponent);
exports.CheckOutComponent = CheckOutComponent;
//# sourceMappingURL=checkout.component.js.map