import * as Types from 'types'
import {normalize, schema} from 'normalizr'
import * as Type from "types";
import Faker from 'faker';

export type Reducer<A> = Type.Reducer<Type.ChatState, A>;

export enum ChatActionType {
    LoadMessages = "chat/load",
    SendMessage = "chat/send",
    UpdateLastReadTime = "chat/UpdateLastReadTime",
};

const initial: Readonly<Type.ChatState> = {
    byId: {},
    allIds: []
};

type LoadChatsAction = {
    type: ChatActionType.LoadMessages;
    payload: Type.Chat[];
};

type SendMessageAction = {
    type: ChatActionType.SendMessage;
    payload: {
        message: Type.Message,
        threadId: string;
    };
};

type UpdateLastReadTimeAction = {
    type: ChatActionType.UpdateLastReadTime;
    payload: {
        chatId: string,
        userId: string;
    };
};

export const loadChatsAction = (chats: Type.Chat[]): LoadChatsAction => ({
    type: ChatActionType.LoadMessages,
    payload: chats
});

export const sendMessageAction = ({message, threadId}: {message: Type.Message, threadId: string}): SendMessageAction => ({
    type: ChatActionType.SendMessage,
    payload: { message, threadId },
});

export const updateLastReadTimeAction = ({chatId, userId}: {chatId: string; userId: string}): UpdateLastReadTimeAction => ({
    type: ChatActionType.UpdateLastReadTime,
    payload: { chatId, userId },
});

const loadChatsRuducer: Reducer<LoadChatsAction> = (state, {payload}) => {
    const chatSchema = new schema.Entity('chats');
    const chatListSchema = [chatSchema];
    const { entities, result } = normalize(payload, chatListSchema);

    return {
        ...state,
        byId: {
            ...state.byId,
            ...entities.chats
        },
        allIds: [
            ...state.allIds,
            ...result
        ]
    }
};

const sendMessageRuducer: Reducer<SendMessageAction> = (state, {payload: {message, threadId}}) => {
    return {
        ...state,
        byId: {
            ...state.byId,
            [threadId]: {
                ...state.byId[threadId],
                messages: [
                    ...state.byId[threadId].messages,
                    message
                ],
                lastMessageTime: message.createdAt,
                userLastReadTime: {
                    ...state.byId[threadId].userLastReadTime,
                    [message.author]: new Date()
                }
            }
        },
    }
};

const updateLastReadTimeReducer: Reducer<UpdateLastReadTimeAction> = (state, {payload: {userId, chatId}}) => {
    return {
        ...state,
        byId: {
            ...state.byId,
            [chatId]: {
                ...state.byId[chatId],
                userLastReadTime: {
                    ...state.byId[chatId].userLastReadTime,
                    [userId]: new Date()
                }
            }
        },
    }
};

export type Actions = LoadChatsAction | SendMessageAction | UpdateLastReadTimeAction;

export const chatsReducer: Reducer<Actions> = (state = initial, action) => {
    switch (action.type) {
        case ChatActionType.LoadMessages:
            return loadChatsRuducer(state, action);
        case ChatActionType.SendMessage:
            return sendMessageRuducer(state, action);
        case ChatActionType.UpdateLastReadTime:
            return updateLastReadTimeReducer(state, action);
    }
    return state;
};

function generateMessages (authors: string[]): Type.Message[] {
    const randomNumberOfMessages = Math.floor(Math.random() * 10) + 1;
    const messages: Type.Message[] = [];

    for (let step = 0; step < randomNumberOfMessages; step++) {
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        messages.push({
            id: Faker.random.uuid(),
            author: randomAuthor,
            text: Faker.lorem.sentence(),
            createdAt: Faker.date.past(),
        })
    }
    return messages;
}

export const generateChats = (trades: Types.Trade[]) => {
    const chats: Types.Chat[] = trades.map(trade => {
        const { benefactor, beneficiary } = trade;
        const authors = [beneficiary.id, benefactor.id];
        const generatedMessages = generateMessages(authors);
        const chat: Type.Chat = {
            id: trade.id,
            messages: generatedMessages,
            userLastReadTime: {
                [authors[0]]: Faker.date.past(),
                [authors[1]]: Faker.date.past(),
            },
            lastMessageTime: generatedMessages[generatedMessages.length - 1].createdAt
        };
        return chat;
    });
    return chats;
};

