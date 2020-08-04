import React from 'react';
import {
    TradeItem,
} from './TradeItem';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    selectMySellingTrades,
    selectAllMyTrades,
} from "../../state/trades/selectors";
import { selectIsMultiTradeMode } from "../../state/auth/selectors";


export const TradeList = () => {
    const isMultiTradeMode = useSelector(selectIsMultiTradeMode);
    const mySellingTrades = useSelector(selectMySellingTrades);
    const allMyTrades = useSelector(selectAllMyTrades);
    const disableLinkStyle = {textDecoration: 'none'};
    const trades = isMultiTradeMode ? allMyTrades : mySellingTrades;

    return <div>
        {trades.map(trade => (
            <Link to={`/sell/trades/${trade.id}`} style={disableLinkStyle}>
                <TradeItem tradeId={trade.id} />
            </Link>
        ))}
    </div>
}
