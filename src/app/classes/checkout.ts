export interface IBuyPersonalInformationData {
  name: string;
  nif: string;
  address: string;
  address2: string;
  postalCode: string;
  phone: string;
  aditionalInformation: string;
  email: string;
}

export interface IBuyShipData {
  name: string;
  address: string;
  address2: string;
  postalCode: string;
  phone: string;
  aditionalInformation: string;
  zoneId: number;
  zone: string;
  carrierId: number;
  carrier: string;
  carrier_price: number;
  carrier_min_days: number;
  carrier_max_days: number;
}

export interface IBuyPaymentMethodData {
  paymentMethodId: number;
  paymentMethod: string;
}

export interface IBuyProductsData {
    productId: number;
    quantity: number;
}

export interface IBuyData {
  personalInformation: IBuyPersonalInformationData;
  ship: IBuyShipData;
  paymentMethod: IBuyPaymentMethodData;
  products: IBuyProductsData[];
}

export interface IBuyDraftData {
  personalInformation: IBuyPersonalInformationData;
  ship: IBuyShipData;
  paymentMethod: IBuyPaymentMethodData;
  products: IBuyProductsData[];
  buyDraftKey: string;
}

export interface IBuyConfirmData {
  errors: string[];
  success: boolean;
  data: IBuyDraftData;
}