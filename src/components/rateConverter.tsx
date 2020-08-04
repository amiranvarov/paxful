import React from 'react';
import {useSelector} from 'react-redux';

import { selectRate } from '../state/rate/selectors'

interface RateConverterInterface {
    amount: number;
}
export const RateConverter = ({amount}: RateConverterInterface) => {
    const rate = useSelector(selectRate());
    return <span>{(amount / rate).toFixed(6)} BTC</span>
};
