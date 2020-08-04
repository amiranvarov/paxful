import React, {
    useState,
} from 'react';
import {
    useDispatch,
    useSelector,
} from "react-redux";
import * as Types from 'types'

import {sendMessageAction} from '../../state/chat/actions'
import { selectAuthenticatedUserId } from "../../state/auth/selectors";
import {generateRandomId} from '../../utils';
import { selectSelectedTradeId } from "../../state/trades/selectors";



export const InputMessage = () => {
    const [messageText, setMessageText] = useState('');
    const dispatch = useDispatch();
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = event.target.value;
        setMessageText(text);
    };
    const authenticatedUserId = useSelector(selectAuthenticatedUserId);
    const threadId = useSelector(selectSelectedTradeId)!;
    const submitForm = () => {
        if (messageText == '') {
            return;
        }
        const message: Types.Message = {
            author: authenticatedUserId!,
            createdAt: new Date(),
            text: messageText,
            id: generateRandomId(),
        };
        dispatch(sendMessageAction({message, threadId }));
        setMessageText('')
    };
    const onSubmit = (event: React.FormEvent<EventTarget>): void => {
        event.preventDefault();
        submitForm()
    };
    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitForm()
        }
    };

    return <form onSubmit={onSubmit}>
        <div className="row mb-2">
            <div className="col-sm-10">
                <textarea className="form-control" rows={3} onChange={onChange} onKeyDown={onKeyDown} value={messageText}></textarea>
            </div>
            <div className="col-sm-2">
                <button className="form-control btn-send">Send</button>
            </div>
        </div>
    </form>;
};
