import * as Type from 'types';
import {
    normalize,
    schema,
} from "normalizr";

import { PaymentType } from "types";
import { PaymentStatus } from "types";
import { dummyUsers } from "../users/actions";

export type Reducer<A> = Type.Reducer<Type.TradesState, A>;

export enum TradesActionType {
    LoadTrades = "trades/load",
    SelectTrade = "trades/select",
    UnselectTrade = "trades/unselect",
    DeleteTrade = "trades/delete",
}

const initial: Readonly<Type.TradesState> = {
    byId: {},
    allIds: [],
    selected: null
};

type SelectTradeAction = {
    type: TradesActionType.SelectTrade;
    payload: string;
};
type DeleteTradeAction = {
    type: TradesActionType.DeleteTrade;
    payload: string;
};
type LoadTradesAction = {
    type: TradesActionType.LoadTrades;
    payload: Type.TradeRaw[];
};
type UnselectTradeAction = {
    type: TradesActionType.UnselectTrade
};

export const selectTradeAction = (tradeId: string): SelectTradeAction => ({
    type: TradesActionType.SelectTrade,
    payload: tradeId,
});
export const deleteTradeAction = (tradeId: string): DeleteTradeAction => ({
    type: TradesActionType.DeleteTrade,
    payload: tradeId,
});
export const loadTradesAction = (trades: Type.TradeRaw[]): LoadTradesAction => ({
    type: TradesActionType.LoadTrades,
    payload: trades,
});
export const unselectTradeAction = (): UnselectTradeAction => ({
    type: TradesActionType.UnselectTrade
});

const selelectTradeRuducer: Reducer<SelectTradeAction> = (state, {payload}) => {
    return {
        ...state,
        selected: payload
    }
};

const deleteTradeRuducer: Reducer<DeleteTradeAction> = (state, {payload}) => {
    const newState = {
        ...state,
    };
    delete newState.byId[payload];
    newState.allIds = state.allIds.filter(item => item !== payload);
    newState.selected = null;
    return newState;
};

const unselelectTradeRuducer: Reducer<UnselectTradeAction> = (state) => {
    return {
        ...state,
        selected: null
    }
};

const loadTradesRuducer: Reducer<LoadTradesAction> = (state, {payload}) => {
    const tradeSchema = new schema.Entity('trades');
    const tradeListSchema = [tradeSchema];
    const { entities, result } = normalize(payload, tradeListSchema);

    return {
        ...state,
        byId: {
            ...state.byId,
            ...entities.trades
        },
        allIds: [
            ...state.allIds,
            ...result
        ]
    }
};

export type Actions = SelectTradeAction | DeleteTradeAction | LoadTradesAction | UnselectTradeAction;

export const tradesReducer: Reducer<Actions> = (state = initial, action) => {
    switch (action.type) {
        case TradesActionType.SelectTrade:
            return selelectTradeRuducer(state, action);
        case TradesActionType.DeleteTrade:
            return deleteTradeRuducer(state, action);
        case TradesActionType.LoadTrades:
            return loadTradesRuducer(state, action);
        case TradesActionType.UnselectTrade:
            return unselelectTradeRuducer(state, action);
    }

    return state;
};

const user1Id = dummyUsers[0].id;
const user2Id = dummyUsers[1].id;

export const dummyTrades: Type.TradeRaw[] = [
    {
        id: 'hgojd',
        paymentType: PaymentType.AmazonGiftCard,
        paymentStatus: PaymentStatus.Paid,
        usdAmount: 77,
        beneficiary: user1Id,
        benefactor: user2Id,
    },
    {
        id: 'fgh6u',
        paymentType: PaymentType.ItunesGiftCard,
        paymentStatus: PaymentStatus.NotPaid,
        usdAmount: 30,
        beneficiary: user1Id,
        benefactor: user2Id,
    },
    {
        id: 'puw9tn',
        paymentType: PaymentType.ItunesGiftCard,
        paymentStatus: PaymentStatus.Paid,
        usdAmount: 45,
        beneficiary: user1Id,
        benefactor: user2Id,
    },
    {
        id: 'hjsp8l',
        paymentType: PaymentType.PayPal,
        paymentStatus: PaymentStatus.NotPaid,
        usdAmount: 12,
        beneficiary: user1Id,
        benefactor: user2Id,
    },
    {
        id: 'XjWp6l',
        paymentType: PaymentType.PayPal,
        paymentStatus: PaymentStatus.NotPaid,
        usdAmount: 9999,
        beneficiary: user2Id,
        benefactor: user1Id,
    },
];
