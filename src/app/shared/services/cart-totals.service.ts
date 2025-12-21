import { Injectable } from '@angular/core';
import { CartItem, Coupon, DeliveryType, TotalsBreakdown } from '../models/cart.models';

@Injectable({ providedIn: 'root' })
export class CartTotalsService {
    computeProductTotal(items: CartItem[] = []): number {
        return Number((items || []).reduce((sum, it) => sum + (it.quantity * it.price), 0));
    }

    computeVAT(items: CartItem[] = []): number {
        const vatItems = (items || []).filter(i => Number(i.vat) !== 0);
        const vat = vatItems.reduce((sum, it) => sum + ((it.quantity * it.price) * (Number(it.vat) / 100)), 0);
        return Number(vat);
    }

    computeCouponAmount(productTotal: number, coupon?: Coupon | null): number {
        if (!coupon) return 0;
        const percentAmount = Number(productTotal) * (Number(coupon.discountPercentage) / 100);
        return Number(Math.min(percentAmount, Number(coupon.maximumDiscount)));
    }

    computeEmployeeDiscount(items: CartItem[] = [], maxCartons: number = 0): number {
        if (!items || !maxCartons || maxCartons <= 0) return 0;
        let remaining = maxCartons;
        let totalDiscount = 0;
        const eligible = items.filter(i => i.cartonActive === 1 && Number(i.weight) > 0);
        for (const it of eligible) {
            if (remaining <= 0) break;
            const eligibleCartons = Math.min(Number(it.quantity), remaining);
            remaining -= eligibleCartons;
            const weightPerCartonKg = Number(it.weight) / 1000; // grams → kg
            totalDiscount += eligibleCartons * weightPerCartonKg * 1.0; // 1 BD per KG
        }
        return Number(totalDiscount);
    }

    computeTotals(params: {
        items: CartItem[];
        deliveryType: DeliveryType | string;
        deliveryCharge?: number;
        coupon?: Coupon | null;
        loyaltyApplied?: boolean;
        loyaltyAmount?: number;
        employeeDiscount?: number;
    }): TotalsBreakdown {
        const productTotal = this.computeProductTotal(params.items);
        const vat = this.computeVAT(params.items);
        const delivery = params.deliveryType === 'DELIVERY' ? Number(params.deliveryCharge || 0) : 0;
        const coupon = this.computeCouponAmount(productTotal, params.coupon);
        const loyalty = params.loyaltyApplied ? Number(params.loyaltyAmount || 0) : 0;
        const employee = Number(params.employeeDiscount || 0);

        const totalRaw = productTotal + vat + delivery - coupon - loyalty - employee;
        const total = Number(totalRaw.toFixed(3));

        return { productTotal, vat, delivery, coupon, loyalty, employee, total };
    }
}
