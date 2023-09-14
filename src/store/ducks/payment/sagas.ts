import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  // loadClientRequest,
  // loadClientSuccess,
  // loadClientFailure,

  createPaymentRequest,
  createPaymentSuccess,
  createPaymentFailure,

  createPaymentPixBoletoRequest,
  createPaymentPixBoletoSuccess,
  createPaymentPixBoletoFailure,
  createPagarMeOrderRequest,
  createPagarMeOrderSuccess,
  createPagarMeOrderFailure,

  // updateClientRequest,
  // updateClientSuccess,
  // updateClientFailure,

  // deleteClientRequest,
  // deleteClientSuccess,
  // deleteClientFailure
} from './actions'

import {Payment} from './types'


//Create
export function* createPayment(payload: ReturnType<typeof createPaymentRequest>) {
  try {
    put(
      createPaymentRequest(payload.payload.user, payload.payload.cart)
    )
    const response: Payment = yield call(api.post, 'pay', payload.payload)
    yield put(createPaymentSuccess(response))
  } catch (error: any) {
    yield put(createPaymentFailure(error.response.data))
  }
}

//Create
export function* createPaymentPixBoleto(payload: ReturnType<typeof createPaymentPixBoletoRequest>) {
  try {
    put(
      createPaymentPixBoletoRequest(payload.payload.user, payload.payload.cart, payload.payload.billingType)
    )
    const response: Payment = yield call(api.post, 'paypixboleto/' + payload.payload.billingType, payload.payload)
    yield put(createPaymentPixBoletoSuccess(response))
  } catch (error: any) {
    yield put(createPaymentPixBoletoFailure(error.response.data))
  }
}

//Create
export function* createPagarMeOrder(payload: ReturnType<typeof createPagarMeOrderRequest>) {
  try {
    put(
      createPagarMeOrderRequest(payload.payload.user, payload.payload.cart)
    )
    const response: Payment = yield call(api.post, 'order', payload.payload)
    yield put(createPagarMeOrderSuccess(response))
  } catch (error: any) {
    yield put(createPagarMeOrderFailure(error.response.data))
  }
}
