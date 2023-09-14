import {action} from 'typesafe-actions'
import { Cart } from '../carts/types'
import {PaymentTypes, Payment} from './types'
import { User } from '../users/types'


// export const loadClientRequest = (id: string) => action(ClientTypes.LOAD_CLIENT_REQUEST, id)
// export const loadClientSuccess = (data: Client) => action(ClientTypes.LOAD_CLIENT_SUCCESS, data)
// export const loadClientFailure = (error: {}) => action(ClientTypes.LOAD_CLIENT_FAILURE, error)

//Create
export const createPaymentRequest = (user: User, cart: Cart) => action(PaymentTypes.CREATE_PAYMENT_REQUEST, {user, cart})
export const createPaymentSuccess = (data: Payment) => action(PaymentTypes.CREATE_PAYMENT_SUCCESS, data)
export const createPaymentFailure = (error: {}) => action(PaymentTypes.CREATE_PAYMENT_FAILURE, error)

export const createPaymentPixBoletoRequest = (user: User, cart: Cart, billingType: string) => action(PaymentTypes.CREATE_PAYMENT_PIX_BOLETO_REQUEST, {user, cart, billingType})
export const createPaymentPixBoletoSuccess = (data: Payment) => action(PaymentTypes.CREATE_PAYMENT_PIX_BOLETO_SUCCESS, data)
export const createPaymentPixBoletoFailure = (error: {}) => action(PaymentTypes.CREATE_PAYMENT_PIX_BOLETO_FAILURE, error)

export const createPagarMeOrderRequest = (user: User, cart: Cart) => action(PaymentTypes.CREATE_PAGARME_ORDER_REQUEST, {user, cart})
export const createPagarMeOrderSuccess = (data: Payment) => action(PaymentTypes.CREATE_PAGARME_ORDER_SUCCESS, data)
export const createPagarMeOrderFailure = (error: {}) => action(PaymentTypes.CREATE_PAGARME_ORDER_FAILURE, error)