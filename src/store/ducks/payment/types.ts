/**
 * Action types
 */
export enum PaymentTypes {
  //Load
  // LOAD_CLIENT_REQUEST = '@client/LOAD_CLIENT_REQUEST',
  // LOAD_CLIENT_SUCCESS = '@client/LOAD_CLIENT_SUCCESS',
  // LOAD_CLIENT_FAILURE = '@client/LOAD_CLIENT_FAILURE',

  CREATE_PAYMENT_REQUEST = '@payment/CREATE_PAYMENT_REQUEST',
  CREATE_PAYMENT_SUCCESS = '@payment/CREATE_PAYMENT_SUCCESS',
  CREATE_PAYMENT_FAILURE = '@payment/CREATE_PAYMENT_FAILURE',

  CREATE_PAYMENT_PIX_BOLETO_REQUEST = '@payment/CREATE_PAYMENT_PIX_BOLETO_REQUEST',
  CREATE_PAYMENT_PIX_BOLETO_SUCCESS = '@payment/CREATE_PAYMENT_PIX_BOLETO_SUCCESS',
  CREATE_PAYMENT_PIX_BOLETO_FAILURE = '@payment/CREATE_PAYMENT_PIX_BOLETO_FAILURE',

  CREATE_PAGARME_ORDER_REQUEST = '@payment/CREATE_PAGARME_ORDER_REQUEST',
  CREATE_PAGARME_ORDER_SUCCESS = '@payment/CREATE_PAGARME_ORDER_SUCCESS',
  CREATE_PAGARME_ORDER_FAILURE = '@payment/CREATE_PAGARME_ORDER_FAILURE',
  // //Create
  // UPDATE_CLIENT_REQUEST = '@client/UPDATE_CLIENT_REQUEST',
  // UPDATE_CLIENT_SUCCESS = '@client/UPDATE_CLIENT_SUCCESS',
  // UPDATE_CLIENT_FAILURE = '@client/UPDATE_CLIENT_FAILURE',

  // //Delete
  // DELETE_CLIENT_REQUEST = '@client/DELETE_CLIENT_REQUEST',
  // DELETE_CLIENT_SUCCESS = '@client/DELETE_CLIENT_SUCCESS',
  // DELETE_CLIENT_FAILURE = '@client/DELETE_CLIENT_FAILURE',

}

/**
 * Data types
 */
// User Imported from Me
export interface Payment {
  id?: string,
  name?: string,
  email?: string,
  phone?: string,
  mobilePhone?: string,
  cpfCnpj?: string,
  postalCode?: string,
  address?: string,
  addressNumber?: string,
  complement?: string,
  province?: string,
  externalReference?: string,
  notificationDisabled?: string,
  additionalEmails?: string,
  municipalInscription?: string,
  stateInscription?: string,
  observations?: string,
  status?: any,
  invoiceUrl?: string,
  billingType?: string,
  code?: any,
  message?: any,
  errors?: any
  charges?: any
}

export interface Error {
  error?: string
}
/**
 * State type
 */
export interface PaymentState {
  data: Payment
  readonly loading: boolean
  readonly error?: Error
}
