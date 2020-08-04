import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateRateAction } from '../../state/rate/actions'

interface ApiRateResponse {
    time: {
        updated: Date;
        updatedISO: Date;
        updateduk: Date;
    },
    bpi: {
        USD: {
            code: string;
            rate: string;
            description: string;
            rate_float: number;
        }
    }
};

export const RateObserver = () => {
    const dispatch = useDispatch();
    const intervaTime = 5000;
    useEffect(() => {
        const interval = setInterval(async () => {
            const { data: { bpi: { USD } } } = await axios.get<ApiRateResponse>('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
            const rate = USD.rate_float;
            dispatch(updateRateAction(rate));
        }, intervaTime);
        return () => clearTimeout(interval);
    }, []);

    return null;
};
