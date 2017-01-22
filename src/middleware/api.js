const debug = false;

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') return next(action);

    let { endpoint, method } = callAPI;
    const { types, data } = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    function actionWith (data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    }

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    function callApi (endpoint, method = 'GET', body) {

    	const API_ROOT = 'https://api.stripe.com/v1/';
        const fullUrl = API_ROOT + endpoint;

        const headers = {
        	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        	Authorization: 'Bearer sk_test_EfaFF4DvuxMeL5XwKfnWAkZg'
        };


        if (body) {
	        body = $.param(body);
	    }

        if (debug) console.log('[API] call', fullUrl, headers, body);

        return fetch(fullUrl, { method, headers, body })
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        if (debug) console.log('[API] rejected response ', fullUrl, json);

                        return Promise.reject(json.error);
                    }

                    if (debug) console.log('[API] response from ' + fullUrl, json);

                    return Object.assign({}, json);
                })
            );
    }

    return callApi(endpoint, method, data).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    );
};
