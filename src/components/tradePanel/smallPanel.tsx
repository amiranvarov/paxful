import React from 'react';
import {useHistory} from 'react-router-dom'

import {PAGE_LINKS} from '../navbar'

import {localizePaymentMethod} from '../../utils'
import { selectSelectedTrade } from '../../state/trades/selectors'
import { deleteTradeAction } from '../../state/trades/actions'
import {
    useDispatch,
    useSelector,
} from "react-redux";


export const TradePanelSmall = () => {
    const trade = useSelector(selectSelectedTrade);
    const dispatch = useDispatch();
    const history = useHistory();
    const onDelete = () => {
        dispatch(deleteTradeAction(trade!.id));
        history.push(`${PAGE_LINKS.SELL_BITCOINS}/trades`)
    };
    if (!trade) {
        return null;
    }

    return <div className={"row"}>
        <div className={"col-3"}>
            <button className={"btn btn-secondary"} onClick={onDelete}>Remove</button>
        </div>
        <div className="col text-center">
            <h2>{localizePaymentMethod(trade.paymentType)}</h2>
            <div>{trade.beneficiary.name} <span>{trade.beneficiary.positiveScore}</span> / <span>{trade.beneficiary.negativeScore}</span></div>
        </div>
        <div className={"col-3 text-right"}>
            <button className={"btn d-md-none"} onClick={() => dispatch(deleteTradeAction(trade.id))}>Release Bitcoin</button>
        </div>
    </div>
}
