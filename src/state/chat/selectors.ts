import * as Types from 'types';
import { createSelector } from 'reselect';
import { selectSelectedTradeId } from '../trades/selectors';
import { selectUsersState  } from "../users/selectors";
import { selectAuthenticatedUserId } from "../auth/selectors";


export const selectChatsState = (state: Types.State) => {
    return state.chats
};

export const selectSelectedThreadChat = createSelector(
    selectChatsState,
    selectSelectedTradeId,
    selectUsersState,
    (chats, selectedTradeId, users) => {
        if (!selectedTradeId) {
            return null;
        }
        const chat = chats.byId[selectedTradeId];
        const messages = chat.messages.map((message) => ({
            ...message,
            author: users.byId[message.author],
        }));
        return {
            ...chat,
            messages,
        }
    }
);

export const isTradeHasUnreadMessages = (tradeId: string) => createSelector(
    selectChatsState,
    selectAuthenticatedUserId,
    (chats, authUserId) => {
        const chat = chats.byId[tradeId];
        const { userLastReadTime, lastMessageTime } = chat;
        if(!authUserId || !userLastReadTime[authUserId]) {
            return false
        }
        return (new Date(userLastReadTime[authUserId]).getTime()) < (new Date(lastMessageTime).getTime());
    }
);
