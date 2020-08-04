import * as Type from 'types';

export type Reducer<A> = Type.Reducer<Type.AuthState, A>;

export enum AuthActionType {
    SwitchUser = "auth/switch",
}

const userIds = [
    '1',
    '2'
];
const initial: Readonly<Type.AuthState> = {
    user: userIds[1],
    multiTradeMode: false,
};

type SwitchUserAction = {
    type: AuthActionType.SwitchUser;
};

export const switchUserAction = (): SwitchUserAction => ({
    type: AuthActionType.SwitchUser,
});

const switchUserRuducer: Reducer<SwitchUserAction> = (state) => {
    return {
        ...state,
        user: state.user === userIds[0] ? userIds[1] : userIds[0],
        multiTradeMode: !state.multiTradeMode
    }
};

export type Actions = SwitchUserAction;

export const authReducer: Reducer<Actions> = (state = initial, action) => {
    switch (action.type) {
        case AuthActionType.SwitchUser:
            return switchUserRuducer(state, action);
    }
    return state;
};
