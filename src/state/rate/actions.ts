import * as Type from 'types';

export type Reducer<A> = Type.Reducer<Type.RateState, A>;

export enum RateActionType {
    UpdateRate = "rate/update",
}

const initial: Readonly<Type.RateState> = {
    rate: 0,
};

type UpdateRateAction = {
    type: RateActionType.UpdateRate;
    payload: {
        rate: number
    }
};

export const updateRateAction = (rate: number): UpdateRateAction => ({
    type: RateActionType.UpdateRate,
    payload: {rate}
});

const updateRateReducer: Reducer<UpdateRateAction> = (state, {payload}) => {
    return {
        rate: payload.rate
    }
};

export type Actions = UpdateRateAction;

export const ratesReducer: Reducer<Actions> = (state = initial, action) => {
    switch (action.type) {
        case RateActionType.UpdateRate:
            return updateRateReducer(state, action);
    }
    return state;
};
