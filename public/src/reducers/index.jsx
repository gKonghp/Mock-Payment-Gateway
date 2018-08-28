import { combineReducers } from 'redux';
import {payment, paymentRecord} from './payment.reducer';

const reducers = combineReducers({
    payment,
    paymentRecord
})

export default reducers
