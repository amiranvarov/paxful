import * as Types from 'types';
import { createSelector } from 'reselect'

export function selectRatesState (s: Types.State): Types.RateState {
    return s.rates;
};

export const selectRate = () => createSelector(
    selectRatesState,
    (s) => {
        return s.rate
    }
);
