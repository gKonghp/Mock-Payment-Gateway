
function getAPI(url, successCallback, failCallback){
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
        .then(
            response =>
            {
                // if (!response.ok) {
                //     return {status: false, payload: response.statusText};
                // }
                return response.json();
            }
        )
        .then(
            response => {
                return successCallback(response);
            }
        )
        .catch((error) => {
            return failCallback(error);
        })
}


function postAPI(url, data, successCallback, failCallback){
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then(
            response =>
            {
                // if (!response.ok) {
                //     return {status: false, payload: response.statusText};
                // }
                return response.json();
            }
        )
        .then(
            response => {
                return successCallback(response);
            }
        )
        .catch((error) => {
            return failCallback(error);
        })
}

export function getPaymentAPI(data){
    var successCallback = function(response){
        return {status: response.status, payload: response.payload};
    }
    var failCallback = function(error){
        console.log(error)
        return {status: false, payload: error}
    }
    return getAPI(`http://localhost:8080/api/order?referenceCode=${data.referenceCode}&custName=${data.custName}`, successCallback, failCallback);
}

export function makePaymentAPI(data){
    var successCallback = function(response){
        return {status: response.status, payload: response.payload};
    }
    var failCallback = function(error){
        return  {status: false, payload: error}
    }
    return postAPI("http://localhost:8080/api/order", data, successCallback, failCallback);
}

