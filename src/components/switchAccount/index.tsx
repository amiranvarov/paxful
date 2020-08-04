import React from 'react';
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { useHistory } from "react-router";

import { switchUserAction } from "../../state/auth/actions";
import { unselectTradeAction } from "../../state/trades/actions";
import { selectAuthenticatedUser } from "../../state/auth/selectors";
import { PAGE_LINKS } from "../navbar";

export const SwitchAccount = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectAuthenticatedUser);

    const onClickSwitchUser = (): void => {
        dispatch(switchUserAction());
        dispatch(unselectTradeAction());
        history.push(`${PAGE_LINKS.SELL_BITCOINS}/trades`);
    };
    return <div className={"mt-3"}>
        <div>Logged in User: {user?.name}</div>
        <button onClick={onClickSwitchUser}>Switch User</button>
    </div>
}
