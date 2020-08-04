import React, { useEffect } from "react";
import {
    Route,
    useRouteMatch,
} from 'react-router-dom';
import { TradingNavBar } from 'components/navbar';
import { TradeList } from 'components/tradeList';
import { TradePanelSmall } from 'components/tradePanel/smallPanel';
import { LargeTradePanel } from 'components/tradePanel/largePanel';
import { SwitchAccount } from 'components/switchAccount';
import { Chat } from 'components/chat';
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { selectTradeAction } from "../state/trades/actions";
import {
    selectSelectedTradeId,
} from "../state/trades/selectors";


const TradesTab = () => {
    return <div className="row">
        <div className="col-xs-12 col-md-3">
            <TradeList  />
            <SwitchAccount />
        </div>
        <div className="col d-none d-md-block">
            Please select trade
        </div>
    </div>
};

const TradesSelectedTab = () => {
    const { params } = useRouteMatch();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(selectTradeAction(params.tradeId))
    }, []);

    const selectedTradeId = useSelector(selectSelectedTradeId);

    if (!selectedTradeId ) {
        return <div>Loading</div>
    }

    return <div className="row h-100 mt-3">
        <div className="d-none col-md-4 col-lg-3 d-md-block">
            <TradeList  />
            <SwitchAccount />
        </div>
        <div className="col-xs-12 col-md-8 col-lg-6 d-flex flex-column flex-fill">
            <TradePanelSmall />
            <hr />
            <Chat />
        </div>
        <div className="d-none d-lg-block col-md-3">
            <LargeTradePanel />
        </div>
    </div>
};


export const SellPage = () => {
    return <div className={"d-flex flex-column flex-grow-1"}>
        <TradingNavBar />
        <div className={"container-fluid d-flex flex-column flex-grow-1"}>
            <Route path={"/sell/overview"}>
                <div className="row">Overview</div>
            </Route>
            <Route path={"/sell/trades"} component={TradesTab} exact/>
            <Route path={"/sell/trades/:tradeId"} component={TradesSelectedTab} />
            <Route path={"/sell/disputes"}>
                <div className="row">Disputes</div>
            </Route>
            <Route path={"/sell/offers"}>
                <div className="row">Your offers</div>
            </Route>
            <Route path={"/sell/my-teams"}>
                <div className="row">My teams</div>
            </Route>
        </div>
    </div>
}
