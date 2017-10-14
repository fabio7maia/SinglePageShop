export interface IZone {
    id: number;
    name: string;
    description: string;
    default: boolean;
    ship: string;
}

export interface ICarrierZone {
    id: number;
    carrierId: string;
    zoneId: string;
    price: number;
    ship_min_days: number;
    ship_max_days: number;
    selected: boolean;
}

export interface IPaymentMethod {
    id: number;
    name: string;
    description: string;
    price: number;
}