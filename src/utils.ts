import { PaymentType, PaymentStatus } from "./types";
import Faker from 'faker';
import * as Types from 'types';

export function localizePaymentMethod (paymentMethod: PaymentType): string {
    switch (paymentMethod) {
        case PaymentType.AmazonGiftCard:
            return "Amazon Gift Card";
        case PaymentType.PayPal:
            return "PayPal";
        case PaymentType.ApplePay:
            return "Apple Pay";
        case PaymentType.ItunesGiftCard:
            return "Itunes Gift Cart";
    }
    return paymentMethod;
}

export function localizePaymentStatus (paymentStatus: PaymentStatus): string {
    switch (paymentStatus) {
        case PaymentStatus.Paid:
            return "PAID";
        case PaymentStatus.NotPaid:
            return "NOT PAID";
    }
    return paymentStatus;
}

export function generateRandomId(): string {
    return Faker.random.uuid()
}

export function sortMessagesByTime (messages: Types.Message[]): Types.Message[] {
    return messages.sort(function(a,b){
        // todo: fix TS issue
        // @ts-ignore
        return new Date(a.createdAt) - new Date(b.createdAt);
    });
}

export function localizeTransactionType (trade: Types.Trade, userId: string): string {
    return trade.beneficiary.id === userId ? 'Buying' : 'Selling';
}
