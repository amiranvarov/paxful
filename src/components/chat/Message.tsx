import React from 'react';
import * as Types from 'types';
import moment from 'moment';
import cn from 'classnames';

import './Message.css';


interface MessageProps extends Omit<Types.Message, 'author' >{
    isOwnMessage: boolean;
    author: Types.User;
}

export const Message = (props: MessageProps) => {
    const UserPhoto = () => <img src={props.author.photo} className={"rounded-circle avatar"}/>;
    return <div className={cn("row message-block", {'own': props.isOwnMessage})}>
        <div className={"col-2 text-right"}>
            {!props.isOwnMessage && <UserPhoto />}
        </div>
        <div className={"col-8"}>
            <div className={"message-text"}>{props.text}</div>
            <div className={"time-ago"}>{moment(props.createdAt).fromNow()}</div>
        </div>
        <div className={"col-2 text-left"}>
            {props.isOwnMessage && <UserPhoto />}
        </div>
    </div>
}
