import { combineReducers } from 'redux';
import { tradesReducer } from './trades/actions';
import { authReducer } from './auth/actions';
import { usersReducer } from './users/actions';
import { chatsReducer } from "./chat/actions";
import { ratesReducer } from "./rate/actions";

export const reducers = combineReducers({
    trades: tradesReducer,
    auth: authReducer,
    users: usersReducer,
    chats: chatsReducer,
    rates: ratesReducer,
})
