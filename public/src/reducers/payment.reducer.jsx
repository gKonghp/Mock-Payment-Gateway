import { GET_PAYMENT, CREATE_PAYMENT, GET_PAYMENT_INITIALIZE} from '../actions/payment';

const initialState = {
    isSuccess: false
}

export function paymentRecord(state = initialState, action) {

    if(!action.data && action.type != GET_PAYMENT_INITIALIZE){
        return state;
    }
    switch(action.type){
        case GET_PAYMENT:
            return {status: action.data.status, data: action.data.payload};

        case GET_PAYMENT_INITIALIZE:
            return initialState;
        default:
            return state;
    }
}

export function payment(state = initialState, action) {

    if(!action.data && action.type != GET_PAYMENT_INITIALIZE){
        return state;
    }
    switch(action.type){

        case CREATE_PAYMENT:
            return {status: action.data.status, data: action.data.payload};
        case GET_PAYMENT_INITIALIZE:
            return initialState;
        default:
            return state;
    }
}