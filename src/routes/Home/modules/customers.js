import { CALL_API } from 'middleware/api';
import lodash from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_CUSTOMERS_REQUEST = 'GET_CUSTOMERS_REQUEST';
export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS';
export const GET_CUSTOMERS_FAILURE = 'GET_CUSTOMERS_FAILURE';

export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_FAILURE = 'CREATE_CUSTOMER_FAILURE';

export const UPDATE_CUSTOMER_REQUEST = 'UPDATE_CUSTOMER_REQUEST';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_FAILURE = 'UPDATE_CUSTOMER_FAILURE';

export const DELETE_CUSTOMER_REQUEST = 'DELETE_CUSTOMER_REQUEST';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export const getAllCustomers = () => ({
    [CALL_API]: {
        types: [GET_CUSTOMERS_REQUEST, GET_CUSTOMERS_SUCCESS, GET_CUSTOMERS_FAILURE],
        endpoint: 'customers?limit=100',
        method: 'GET'
    }
});

export const createCustomer = (data) => ({
    [CALL_API]: {
        types: [CREATE_CUSTOMER_REQUEST, CREATE_CUSTOMER_SUCCESS, CREATE_CUSTOMER_FAILURE],
        endpoint: 'customers',
        method: 'POST',
        data
    }
});

export const updateCustomer = (customerId, data) => ({
    [CALL_API]: {
        types: [UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILURE],
        endpoint: 'customers/' + customerId,
        method: 'POST',
        data
    }
});

export const deleteCustomer = (customerId) => ({
    [CALL_API]: {
        types: [DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE],
        endpoint: 'customers/' + customerId,
        method: 'DELETE'
    }
});

export const actions = {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [GET_CUSTOMERS_REQUEST]    : (state, action) => ({ ...state, isFetching: true, doUpdate: false }),
    [GET_CUSTOMERS_SUCCESS]    : (state, action) => ({ ...state, isFetching: false, customersData: lodash.get(action, 'response.data', []) }),
    [GET_CUSTOMERS_FAILURE]    : (state, action) => ({ ...state, isFetching: false, errorMessage: action.error }),

    [CREATE_CUSTOMER_REQUEST]    : (state, action) => ({ ...state, isFetching: true }),
    [CREATE_CUSTOMER_SUCCESS]    : (state, action) => ({ ...state, isFetching: false, createData: action.response, doUpdate: true }),
    [CREATE_CUSTOMER_FAILURE]    : (state, action) => ({ ...state, isFetching: false, errorMessage: action.error }),

    [UPDATE_CUSTOMER_REQUEST]    : (state, action) => ({ ...state, isFetching: true }),
    [UPDATE_CUSTOMER_SUCCESS]    : (state, action) => ({ ...state, isFetching: false, updateData: action.response, doUpdate: true }),
    [UPDATE_CUSTOMER_FAILURE]    : (state, action) => ({ ...state, isFetching: false, errorMessage: action.error }),

    [DELETE_CUSTOMER_REQUEST]    : (state, action) => ({ ...state, isFetching: true }),
    [DELETE_CUSTOMER_SUCCESS]    : (state, action) => ({ ...state, isFetching: false, deleteData: action.response, doUpdate: true }),
    [DELETE_CUSTOMER_FAILURE]    : (state, action) => ({ ...state, isFetching: false, errorMessage: action.error })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isFetching: true,
    value: 0,
    customersData: []
};

export default function customersReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
