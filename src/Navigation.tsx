import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { PAGE_LINKS } from 'components/navbar'
import {
    // useSelector,
    useStore,
} from 'react-redux';

import {SoonPage} from  "pages/soon"
import {SellPage} from  "pages/sell"
import { useDispatch } from "react-redux";
import {loadUsersAction, dummyUsers} from "./state/users/actions";
import {loadTradesAction, dummyTrades} from "./state/trades/actions";
import { loadChatsAction, generateChats } from "./state/chat/actions";
import { selectMyTrades } from "./state/trades/selectors";

export const Navigation = () => {
    const dispatch = useDispatch();
    const store = useStore();

    useEffect(() => {
        dispatch(loadUsersAction(dummyUsers));
        dispatch(loadTradesAction(dummyTrades));
        const trades = selectMyTrades(store.getState());
        dispatch(loadChatsAction(generateChats(trades)));
    }, [dispatch]);

    return (
        <Switch>
            <Route path={PAGE_LINKS.BUY_BITCOINS} component={SoonPage} />
            <Route path={PAGE_LINKS.SELL_BITCOINS} component={SellPage}/>
            <Route path={PAGE_LINKS.WALLET} component={SoonPage} />
        </Switch>
    );
};

export default Navigation;
