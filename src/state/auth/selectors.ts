import * as Types from 'types';
import {createSelector} from 'reselect'
import { selectUsersState } from "../users/selectors";

export const selectAuthState = (s: Types.State): Types.AuthState => {
    return s.auth;
};

export const selectAuthenticatedUserId = createSelector(
    selectAuthState,
    (s) => s.user
);

export const selectIsMultiTradeMode = createSelector(
    selectAuthState,
    (s) => s.multiTradeMode
);

export const selectAuthenticatedUser = createSelector(
    selectAuthenticatedUserId,
    selectUsersState,
    (authenticatedUserId, users) => users.byId[authenticatedUserId!]
);

