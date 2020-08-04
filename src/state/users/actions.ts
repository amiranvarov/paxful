import * as Type from 'types';
import {normalize, schema} from 'normalizr'

export type Reducer<A> = Type.Reducer<Type.UsersState, A>;

export enum UsersActionType {
    LoadUsers = "users/load",
};

export const dummyUsers: Type.User[] = [
    {
        id: '1',
        name: 'Chanaar',
        photo: 'https://randomuser.me/api/portraits/men/42.jpg',
        positiveScore: 37,
        negativeScore: 1
    },
    {
        id: '2',
        name: 'Kristine Kallis',
        photo: 'https://randomuser.me/api/portraits/women/72.jpg',
        positiveScore: 17,
        negativeScore: 0
    },
];

const initial: Readonly<Type.UsersState> = {
    byId: {},
    allIds: []
};

type LoadUsersAction = {
    type: UsersActionType.LoadUsers;
    payload: Type.User[];
};

export const loadUsersAction = (users: Type.User[]): LoadUsersAction => ({
    type: UsersActionType.LoadUsers,
    payload: users
});

const loadUsersRuducer: Reducer<LoadUsersAction> = (state, {payload}) => {
    const userSchema = new schema.Entity('users');
    const userListSchema = [userSchema];
    const { entities, result } = normalize(payload, userListSchema);

    return {
        ...state,
        byId: {
            ...state.byId,
            ...entities.users
        },
        allIds: [
            ...state.allIds,
            ...result
        ]
    }
};

export type Actions = LoadUsersAction;

export const usersReducer: Reducer<Actions> = (state = initial, action) => {
    switch (action.type) {
        case UsersActionType.LoadUsers:
            return loadUsersRuducer(state, action);
    }

    return state;
};
