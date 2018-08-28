// call APIs
import * as paymentAPI from '../api/payment';

// Constants
export const GET_PAYMENT = 'GET_PAYMENT';
export const GET_PAYMENT_INITIALIZE = 'GET_PAYMENT_INITIALIZE';
export const CREATE_PAYMENT = 'CREATE_PAYMENT';

// Action creators
export function getPaymentAction(referenceCode, custName){
    return (dispatch, getState) =>{
        var queryStr = {
            referenceCode: referenceCode,
            custName: custName
        }
        paymentAPI.getPaymentAPI(queryStr)
            .then((result) => {
                dispatch({type: GET_PAYMENT, data: result});
            })
            .catch((error) => {
                dispatch({type: GET_PAYMENT, error});
            })
        ;
    }
}

export function initializePaymentAction() {
    return (dispatch, getState) => {
        dispatch({type: GET_PAYMENT_INITIALIZE});
    }
}

export function createPaymentAction(body){
    return (dispatch, getState) =>{
        paymentAPI.makePaymentAPI(body)
            .then((result) => {
                dispatch({type: CREATE_PAYMENT, data: result});
            })
            .catch((error) => {
                dispatch({type: CREATE_PAYMENT, error});
            })
        ;
    }
}