export type DeliveryType = 'PICKUP' | 'DELIVERY';
export type PaymentType = 'WALLET' | 'CARD' | 'CASH' | string;

export interface CartItem {
    id: number;
    name?: string;
    enProductName?: string;
    arProductName?: string;
    quantity: number;
    price: number;
    vat: number; // percentage value e.g., 10 for 10%
    cartonActive?: 0 | 1;
    weight?: number; // grams per carton when cartonActive = 1
    stock?: number;
    noOfPieces?: number;
}

export interface Coupon {
    id: number;
    couponCode: string;
    discountPercentage: number;
    maximumDiscount: number;
    arCouponName?: string;
}

export interface Address {
    id: number;
    zoneId?: number;
    area?: string;
    blockNo?: string;
    houseNo?: string;
    roadNo?: string;
    pin?: string;
    flat?: string;
    notes?: string;
    saveAs?: string;
    address?: string; // pickup address text
    deliveryCharge?: number;
}

export interface ViewCartResponse {
    data: CartItem[];
    address?: Address;
    loyaltyPoint?: number;
    isSelfPickup?: number; // 1 or 0
    isDelivery?: number; // 1 or 0
    canCalendarShowForDelivery?: string;
    maxCartonDiscountPerDay?: number;
    maxCartonDiscountPerDayUser?: number;
    defaultMaxCartonDiscountPerDayEmployee?: number;
    defaultMaxCartonDiscountPerDayUser?: number;
    cartonDiscount?: number; // for employee or user
    adminDate?: any;
    holidayList?: string[]; // format dd/MM/yyyy
    walletBalance?: number;
}

export interface TotalsBreakdown {
    productTotal: number;
    vat: number;
    delivery: number;
    coupon: number;
    loyalty: number;
    employee: number;
    total: number;
}
