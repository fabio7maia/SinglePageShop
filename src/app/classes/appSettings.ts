export class AppSettings {
    public static get IsAnalyticsActive(): boolean { return true; }
    public static get WebApiUrl(): string { return 'http://localhost:8000/'; }
    public static get DefaultProductImage(): string { return 'images/products/default.jpg'; }
}