import {Reducer} from 'redux'
import {PaymentState, PaymentTypes} from './types'

const INITIAL_STATE: PaymentState = {
  data: {},
  error: {},
  loading: false,
}

const reducer: Reducer<PaymentState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Create
    case PaymentTypes.CREATE_PAYMENT_REQUEST:
      return {...state, loading: true, data: {}}
    case PaymentTypes.CREATE_PAYMENT_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case PaymentTypes.CREATE_PAYMENT_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    case PaymentTypes.CREATE_PAYMENT_PIX_BOLETO_REQUEST:
      return {...state, loading: true, data: {}}
    case PaymentTypes.CREATE_PAYMENT_PIX_BOLETO_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case PaymentTypes.CREATE_PAYMENT_PIX_BOLETO_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    case PaymentTypes.CREATE_PAGARME_ORDER_REQUEST:
      return {...state, loading: true, data: {}}
    case PaymentTypes.CREATE_PAGARME_ORDER_SUCCESS:
      return {...state, loading: false, error: {}, data: action.payload.data}
    case PaymentTypes.CREATE_PAGARME_ORDER_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    default:
      return state
  }
}

export default reducer
