const MAX: number = 999999999;

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    promotionPrice: number;
    images: Object[];
    stock: number;
    quantity: number;
    categoryId: string;
}

export class Product implements IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    promotionPrice: number;
    images: Object[];
    stock: number;
    quantity: number;
    categoryId: string;
}