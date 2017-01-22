let msbToken = '';

const API_ROOT = 'https://api.stripe.com/';
const debug = false;


// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.

function bodyFormat (data) {
    const fd = new FormData();

    for (const k in data) {
        fd.append(k, data[k]);
    }
    return fd;
}

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

    async function callApi (endpoint, method = 'GET', data) {
        const value = await AsyncStorage.getItem('msbToken');
        const fullUrl = API_ROOT + endpoint;

        msbToken = (value !== null) ? value : '';

        if (debug) console.log('[API] Value = ', value);

        const headers = { apikey };

        // Create token hack
        // if (endpoint !== 'token/create')
        if (msbToken) {
            headers.msbToken = msbToken;
        }

        let body = null;
        if (typeof data !== 'undefined' && typeof data.body !== 'undefined' && method === 'POST') {
            body = bodyFormat(data.body);
        }

        if (debug) console.log('[API] call', fullUrl, headers, body);

        return fetch(fullUrl, { method, headers, body })
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        if (debug) console.log('[API] rejected response ', fullUrl, response);

                        return Promise.reject(json);
                    }

                    if (debug) console.log('[API] response from ' + fullUrl, json.data);

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
