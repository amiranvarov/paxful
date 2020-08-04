
/**
 * Global Action/Reducer/Selector types
 */
export type ReducerType<S, A> = (state: S, action: A) => S;
export type ActionType<R, T> = (payload: T) => R;
export type Reducer<S, A> = ReducerType<Readonly<S>, Readonly<A>>;
export type Action<R, P> = ActionType<Readonly<R>, Readonly<P>>;

export enum PaymentType {
    PayPal = 'paypal',
    ApplePay = 'applePay',
    AmazonGiftCard = 'amazonGiftCard',
    ItunesGiftCard = 'itunesGiftCard',
}

export enum PaymentStatus {
    Paid = 'paid',
    NotPaid = 'notPaid',
}
// export enum TradeTransactionType {
//     Buy = 'buy',
//     Sell = 'sell'
// }

export type Trade = {
    id: string;
    paymentType: PaymentType;
    paymentStatus: PaymentStatus
    usdAmount: number;
    btcAmount?: number;
    beneficiary: User;
    benefactor: User;
}

export type TradeRaw = Omit<Trade, 'beneficiary' | 'benefactor'> & {beneficiary: string; benefactor: string;};

export type User = {
    id: string;
    name: string;
    photo: string;
    positiveScore: number;
    negativeScore: number;
}

export type Message = {
    id: string
    author: string;
    createdAt: Date;
    text: string;
}

export type Chat = {
    id: string;
    messages: Message[];
    userLastReadTime: {
        [x: string]: Date,
    }
    lastMessageTime: Date;
}


interface NormalizedObjects<T> {
    byId: { [id: string]: T };
    allIds: string[];
}

export type TradesState = { selected: string | null; } & NormalizedObjects<TradeRaw>;

export type UsersState = NormalizedObjects<User>;

export type AuthState = {
    user: string | null;
    multiTradeMode: boolean,
};

export type RateState = {
    rate: number;
};

export type ChatState = NormalizedObjects<Chat>;

export type State = {
    trades: TradesState,
    users: UsersState,
    auth: AuthState,
    chats: ChatState,
    rates: RateState,
};


