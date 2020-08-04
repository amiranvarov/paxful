import React, {useRef, useEffect} from 'react';
import {
    useDispatch,
    useSelector,
} from "react-redux";

import { Message } from './Message';
import * as Types from 'types';

import {
    selectSelectedTradeId,
} from '../../state/trades/selectors';
import { selectSelectedThreadChat } from '../../state/chat/selectors';
import {updateLastReadTimeAction} from '../../state/chat/actions';
import { selectAuthenticatedUserId } from '../../state/auth/selectors'
import {sortMessagesByTime } from "../../utils";


import './Messages.css'


export const Messages = () => {
    const chat = useSelector(selectSelectedThreadChat);
    const authenticatedUser = useSelector(selectAuthenticatedUserId);
    const selectedTradeId = useSelector(selectSelectedTradeId);
    const dispatch = useDispatch();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };
    useEffect( () => {
        dispatch(updateLastReadTimeAction({chatId: chat!.id, userId: authenticatedUser!}))
    }, [selectedTradeId]);
    useEffect(scrollToBottom, [chat?.messages]);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);


    if (chat?.messages === null) {
        // @ts-ignore
        chat.messages = sortMessagesByTime(chat.messages);
    }

    return <div className={"messages-list d-flex flex-column flex-fill mb-2"}>
        {chat?.messages.map(message => <Message isOwnMessage={authenticatedUser === message.author.id} {...message} />)}
        <div ref={messagesEndRef} />
    </div>
};
