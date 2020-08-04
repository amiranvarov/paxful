import React from 'react';
import { useRouteMatch } from "react-router-dom";


export const SectionsLink = {
    Overview: {
        url: 'overview',
        label: 'Overview'
    },
    Trades: {
        url: 'trades',
            label: 'Trades'
    },
    Disputes: {
        url: 'disputes',
            label: 'Disputes'
    },
    Offers: {
        url: 'offers',
            label: 'Your offers'
    },
    MyTeams: {
        url: 'my-teams',
            label: 'My teams'
    },
    TradeHistory: {
        url: 'trade-history',
        label: 'Trade history'
    }
};

export const TradingNavBar = () => {
    const { path } = useRouteMatch();
    return <nav className="nav navbar-light bg-light  justify-content-center">
        <a className="nav-link active" href={`${path}/${SectionsLink.Overview.url}`}>{SectionsLink.Overview.label}</a>
        <a className="nav-link active" href={`${path}/${SectionsLink.Trades.url}`}>{SectionsLink.Trades.label}</a>
        <a className="nav-link active" href={`${path}/${SectionsLink.Disputes.url}`}>{SectionsLink.Disputes.label}</a>
        <a className="nav-link active" href={`${path}/${SectionsLink.Offers.url}`}>{SectionsLink.Offers.label}</a>
        <a className="nav-link active" href={`${path}/${SectionsLink.MyTeams.url}`}>{SectionsLink.MyTeams.label}</a>
        <a className="nav-link active" href={`${path}/${SectionsLink.TradeHistory.url}`}>{SectionsLink.TradeHistory.label}</a>
    </nav>
};

