import { createStore } from 'redux';
import { reducers } from './';

export function configureStore() {
    return createStore(
        reducers,
    );
}
