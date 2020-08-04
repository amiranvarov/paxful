import React from 'react';
import {
    useSelector,
} from "react-redux";

import { selectSelectedTrade, selectTradingPartnerProfile } from '../../state/trades/selectors';
import {RateConverter} from '../rateConverter'

import { localizePaymentStatus } from '../../utils';

import './largePanel.css'


export const LargeTradePanel = () => {
    const trade = useSelector(selectSelectedTrade)!;
    const tradingPartnerProfile = useSelector(selectTradingPartnerProfile(trade?.id));

    return <div>
        <div className="text-center top-brief">
            <h4>You are trading with <br /> {tradingPartnerProfile.name}</h4>
            <h6>Started {"X"} minutes ago</h6>
            <button className="btn btn-success" onClick={() => alert('Release bitcoin')}>Release Bitcoin</button>
        </div>
        <table className={"table table-bordered"}>
            <tr>
                <td>
                    <div>
                        <img className={"rounded-circle avatar"} src={tradingPartnerProfile.photo} />
                    </div>
                    <span>+{tradingPartnerProfile.positiveScore}/-{tradingPartnerProfile.negativeScore}</span>
                </td>
                <td>
                    <h6># OF TRADES</h6>
                    <div>4</div>
                </td>
            </tr>
            <tr>
                <td>
                    <h6>TRADE STATUS</h6>
                    <p>{localizePaymentStatus(trade.paymentStatus)}</p>
                </td>
                <td>
                    <h6>TRADE HASH</h6>
                    <p>{trade.id}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <h6>AMOUNT USD</h6>
                    <p>{trade.usdAmount}</p>
                </td>
                <td>
                    <h6>AMOUNT BTC</h6>
                    <p>{<RateConverter amount={trade.usdAmount} />}</p>
                </td>
            </tr>
        </table>
    </div>
}
