import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IShopCartServiceData, ShopCartService } from './../../services/shop-cart.service';
import { CheckOutService } from './../../services/checkout.service';
import { IProduct } from './../../classes/product';
import { IZone, ICarrierZone, IPaymentMethod } from './../../classes/transportations';
import { IBuyData, IBuyDraftData } from './../../classes/checkout';
import { AppSettings } from './../../classes/appSettings';

import { Observable } from 'rxjs/Observable';

interface IStep {
  number: number;
  name: string;
  description: string;
}

@Component({
  //moduleId: module.id,
  providers: [ShopCartService, CheckOutService],
  templateUrl: './checkout.html'
})
export class CheckOutComponent implements OnInit, OnDestroy, OnChanges { 
  shopCartData: IShopCartServiceData;

  private subscriptionShopCart: Subscription;
  private subscriptionZones: Subscription;
  private subscriptionCarriers: Subscription;

  private shipPrice: number = 0;

  private isClickButton: boolean = false;

  WebApiUrl: string = AppSettings.WebApiUrl;
  DefaultProductImage: string = AppSettings.DefaultProductImage;

  buy: IBuyData = null;

  confirmBuy: IBuyDraftData = null;

  alerts: string[] = [];
  errors: string[] = [];

  step: number = -1;
  buttons: Object[];

  steps: IStep[] = [
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

  zones: IZone[];
  carriers: ICarrierZone[];
  paymentMethods: IPaymentMethod[];

  isBuyValid: boolean;

  constructor(private shopCartService: ShopCartService, private checkoutService: CheckOutService){}

  private initBuyAndConfirmBuy(){
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
      paymentMethod:{
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
      paymentMethod:{
        paymentMethodId: null,
        paymentMethod: null
      },
      products: [],
      buyDraftKey: null
    };
  }

  private defineButtons(): void {
    this.buttons = [];

    if (this.step == 1) {
      this.buttons[0] = {
        type: "submit",
        label: "Encomendar",
        class: "item_add hvr-skew-backward",
        fn: 'NextStep'
      };
    }
    else if(this.step == 4)
    {
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
    else
    {
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
  }

  getCssClassFormStep(stepForm: number): string {
    if (stepForm == this.step) return 'active';
    else return 'disabled';
  }

  private isShipSelectedValid(): boolean {
    let isValid: boolean = true;

    if (this.buy.ship.zoneId != null){
      //this.zones.forEach(zone => {
      for(let i=0; i < this.zones.length; i++){
        let zone = this.zones[i];

        if (zone.id == this.buy.ship.zoneId && zone.ship == 'Sim' && this.buy.ship.carrierId == null ){
          isValid = null;
        }
      }
      //});
    }
    return isValid;
  }

  verifyBuyIsValid(){
    this.isBuyValid = true;

    // necessário colocar a nulo pois apenas verifica se está definido, pois a validação é required
    if (this.shopCartData.products.size == 0) this.isBuyValid = null;
    if (!this.isShipSelectedValid()) this.isBuyValid = null;
  }

  defineStepisEmpty(): void {
    if (this.shopCartData.products.size > 0) this.step = 1;
    else this.step = -1;
  }

  ngOnInit(){
      this.initBuyAndConfirmBuy();

      this.subscriptionShopCart = this.shopCartService.$data.subscribe(data => {
        this.shopCartData = data;

        this.defineStepisEmpty();
        
        this.verifyBuyIsValid();
      });
      this.defineButtons();
      this.getZones();
      this.getPaymentMethods();
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    if (this.subscriptionShopCart) this.subscriptionShopCart.unsubscribe();
    if (this.subscriptionZones) this.subscriptionZones.unsubscribe();
    if (this.subscriptionCarriers) this.subscriptionCarriers.unsubscribe();
  }

  ngOnChanges(){
    this.verifyBuyIsValid();
  }

  getZones(): void {
    this.subscriptionZones = this.checkoutService.getZones().subscribe(zones => {
      this.zones = zones;
    });
  }

  private removeCarrier(){
    this.shopCartData.totalPrice -= this.shipPrice;
    this.shipPrice = 0;
    this.buy.ship.carrierId = null;
  }

  UpdateTotalPriceWithShipPrice(carrier: ICarrierZone): void {
    if (this.buy.ship.carrierId != null){
      this.removeCarrier();
    }else{
      this.shopCartData.totalPrice += carrier.price;
      this.shipPrice = carrier.price;
      this.buy.ship.carrierId = carrier.id;
      carrier.selected = true;
    }
  }

  SetPaymentMethodSelected(paymentMethod: IPaymentMethod): void {
    this.buy.paymentMethod.paymentMethodId = paymentMethod.id;
  }

  getCarriers(): void {
    this.removeCarrier();

    this.subscriptionCarriers = this.checkoutService.getCarriers(this.buy.ship.zoneId).subscribe(carriers => {
      this.carriers = carriers;

      this.carriers.forEach(carrier => {
        carrier.selected = false;
      });
    });
  }

  getPaymentMethods(): void {
    this.checkoutService.getPaymentMethods().subscribe(paymentMethods => {
      this.paymentMethods = paymentMethods;
    });
  }

  DelProduct(product: IProduct): void {
    if (this.shopCartService.DelProduct(product)){
      this.defineStepisEmpty();
    }
  }

  onSubmit(): void {}

  NextStep(): void{
    this.step++;
    this.defineButtons();

    if (this.step == 3){
      this.buy.ship.address = this.buy.personalInformation.address;
      this.buy.ship.address2 = this.buy.personalInformation.address2;
      this.buy.ship.aditionalInformation = this.buy.personalInformation.aditionalInformation;
      this.buy.ship.name = this.buy.personalInformation.name;
      this.buy.ship.phone = this.buy.personalInformation.phone;
      this.buy.ship.postalCode = this.buy.personalInformation.postalCode;
    }
  }

  PreviousStep(): void{
    this.step--;
    this.defineButtons();
  }

  private definePersonalInfomartionShip(){
    this.buy.ship.address = this.buy.personalInformation.address;
    this.buy.ship.address2 = this.buy.personalInformation.address2;
    this.buy.ship.aditionalInformation = null;
    this.buy.ship.name = this.buy.personalInformation.name;
    this.buy.ship.phone = this.buy.personalInformation.phone;
    this.buy.ship.postalCode = this.buy.personalInformation.postalCode;
  }

  Buy(): void{
    if (!this.isClickButton){
      this.isClickButton = true;

      this.buy.products = [];

      this.shopCartData.products.forEach(product => {
        this.buy.products.push({
          productId: product.id,
          quantity: product.quantity
        });
      });

      this.definePersonalInfomartionShip();

      this.checkoutService.setBuyDraft(this.buy)
        .subscribe(data => {

          if (data.success){
            this.confirmBuy = data.data;

            this.showBuyConfirmation();
          }else{
            this.errors = data.errors;

            // remover o preço de envio
            this.removeCarrier();

            this.showErrors();
          }

          this.isClickButton = false;
        });
    }
  }

  showBuyConfirmation(){
    this.step = 100;
  }

  showErrors(){
    this.step = 0;
  }

  resetErrorsAndAlerts(){
    this.errors = [];
    this.alerts = [];
  }

  finishBuy(){
    this.shopCartService.Empty();
    this.initBuyAndConfirmBuy();
    this.step = 0;
  }

  cancelBuy(): void {
    if (!this.isClickButton){
      this.isClickButton = true;

      this.resetErrorsAndAlerts();

      this.checkoutService.delBuyDraft(this.confirmBuy.buyDraftKey).subscribe(data => {

        this.alerts[0] = 'Compra cancelada com sucesso';

        this.finishBuy();

        this.isClickButton = false;
      });
    }
  }

  confirmBuyFn(): void {
    if (!this.isClickButton){
      this.isClickButton = true;

      this.resetErrorsAndAlerts();

      this.checkoutService.setBuy(this.confirmBuy.buyDraftKey).subscribe(data => {
        if (data.success){
          this.alerts[0] = 'Compra efetuada com sucesso';
        }else{
          this.errors[0] = data.errors[0];
        }

        this.finishBuy();

        this.isClickButton = false;
      });
    }
  }
}
