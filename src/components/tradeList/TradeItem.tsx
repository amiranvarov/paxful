import React from 'react';
import {
    useDispatch,
    useSelector,
} from "react-redux";
import {
    PaymentStatus,
} from 'types';
import cn from 'classnames';

import {
    localizePaymentMethod,
    localizePaymentStatus,
    localizeTransactionType
} from '../../utils';
import {
    selectIsTradeSelected,
    selectTradeById,
    selectTradingPartnerProfile,
} from '../../state/trades/selectors';
import { selectTradeAction } from '../../state/trades/actions';
import { isTradeHasUnreadMessages } from '../../state/chat/selectors';

import {RateConverter} from '../rateConverter'

import './TradeItem.css'

interface NewMessageIndicatorProps {
    isNewMessagePresent: boolean;
}
const NewMessageIndicator = ({isNewMessagePresent}: NewMessageIndicatorProps) => {
    return <div className={cn("message-indicator", { green: isNewMessagePresent })} />
};

export interface TradeItemProps {
    tradeId: string;
    isActive?: boolean;
}
export const TradeItem = (props: TradeItemProps) => {
    const { tradeId } = props;
    const trade = useSelector(selectTradeById(tradeId));
    const isSelected = useSelector(selectIsTradeSelected(tradeId));
    const isUnreadMessagePresent = useSelector(isTradeHasUnreadMessages(tradeId));
    const tradingPartnerProfile = useSelector(selectTradingPartnerProfile(trade.id));
    const dispatch = useDispatch();

    const style = isSelected ? { backgroundColor: '#f2f2f2' } : {};

    return <div className="card p-2 trade" onClick={() => dispatch(selectTradeAction(trade.id))} style={style}>
        <div className={"row"}>
            <div className={"col-9"}>
                <div className={"ml-4"}>
                    <NewMessageIndicator isNewMessagePresent={isUnreadMessagePresent} />
                    <div className={"username mb-1"}>{tradingPartnerProfile.name} is {localizeTransactionType(trade, tradingPartnerProfile.id)}</div>
                    <div className={"payment-type"}>{localizePaymentMethod(trade.paymentType)}</div>
                    <div className={"amount"}>{trade.usdAmount} USD ({<RateConverter amount={trade.usdAmount}/>})</div>
                </div>
            </div>
            <div className={"col-3 text-center"}>
                <div>
                    <img className={"rounded-circle avatar"} src={tradingPartnerProfile.photo} />
                </div>
                <span className={cn("payment-status", { payed: trade.paymentStatus === PaymentStatus.Paid })}>{localizePaymentStatus(trade.paymentStatus)}</span>
            </div>
        </div>
    </div>
};
