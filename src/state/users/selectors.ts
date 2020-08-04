import {createSelector} from 'reselect'
import * as Type from 'types';

export const selectUsersState = (s: Type.State): Type.UsersState => {
    return s.users;
};

export const selectAllUsers = createSelector(
    selectUsersState,
    (s) => s.allIds.map(x => s.byId[x])
);
