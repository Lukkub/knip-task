// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST'
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS'
export const CREATE_CUSTOMER_FAILURE = 'CREATE_CUSTOMER_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().customers
        })
        resolve()
      }, 200)
    })
  }
}

import { CALL_API } from '../../../middleware/api';

export const createCustomer = (data) => ({
    [CALL_API]: {
        types: [CREATE_CUSTOMER_REQUEST, CREATE_CUSTOMER_SUCCESS, CREATE_CUSTOMER_FAILURE],
        endpoint: 'v1/customers',
        method: 'POST',
        data
    }
});





export const actions = {
  increment,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
