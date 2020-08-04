import * as Type from 'types'
import {createSelector} from 'reselect'
import { selectUsersState } from "../users/selectors";
import { selectAuthenticatedUserId } from '../auth/selectors';

export function selectTradesState(s: Type.State): Type.TradesState {
    return s.trades;
}

export const selectAllTrades = createSelector(
    selectTradesState,
    selectUsersState,
    (trades,users) => {
        const mappedTrades: Type.Trade[] = trades.allIds.map(x => {
            const trade = trades.byId[x];
            return {
                ...trade,
                beneficiary: users.byId[trade.beneficiary],
                benefactor: users.byId[trade.benefactor],
            };
        });
        return mappedTrades;
    }
);

export const selectMyTrades = createSelector(
    selectAllTrades,
    selectAuthenticatedUserId,
    (trades, userId) => {
        return trades.filter(trade => trade.benefactor.id === userId || trade.beneficiary.id === userId)
    }
);

export const selectMySellingTrades = createSelector(
    selectAllTrades,
    selectAuthenticatedUserId,
    (trades, userId) => {
        return trades.filter(trade => trade.benefactor.id === userId)
    }
);

export const selectAllMyTrades = createSelector(
    selectAllTrades,
    selectAuthenticatedUserId,
    (trades, userId) => {
        return trades.filter(trade => trade.benefactor.id === userId || trade.beneficiary.id === userId )
    }
);

export const selectTradeById = (tradeId: string) => createSelector(
    selectTradesState,
    selectUsersState,
    (trades,users) => {
        const trade = trades.byId[tradeId];
        return {
            ...trade,
            beneficiary: users.byId[trade.beneficiary],
            benefactor: users.byId[trade.benefactor],
        };
    }
);

export const selectSelectedTradeId = createSelector(
    selectTradesState,
    (s) => s.selected
);

export const selectSelectedTrade = createSelector(
    selectSelectedTradeId,
    selectTradesState,
    selectUsersState,
    (tradeId, trades, users) => {
        if (!tradeId) {
            return null;
        }
        const trade = trades.byId[tradeId];
        return {
            ...trade,
            beneficiary: users.byId[trade.beneficiary]
        }
    }
);

export const selectIsTradeSelected = (tradeId: string) => createSelector(
    selectSelectedTradeId,
    (selectedTradeId) => {
        return selectedTradeId == tradeId
    }
);

export const selectTradingPartnerProfile = (tradeId: string) => createSelector(
    selectUsersState,
    selectTradesState,
    selectAuthenticatedUserId,
    (users, trades, authenticatedUserId) => {

        const { beneficiary, benefactor } = trades.byId[tradeId];
        const partnerId =  authenticatedUserId === beneficiary ? benefactor : beneficiary;
        return users.byId[partnerId];
    }
);




