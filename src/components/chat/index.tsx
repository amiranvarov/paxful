import React from 'react';
import { InputMessage } from './InputMesssage';
import { Messages } from './Messages'

export const Chat = () => {
    return <div className={"d-flex flex-column flex-fill"}>
        <Messages />
        <InputMessage />
    </div>
};
