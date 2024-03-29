import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Login
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,

  //authfromcookie,
  //logoutUser,

  //Update
  updateMeRequest,
  updateMeSuccess,
  updateMeFailure,

  //Create
  createMeRequest,
  createMeSuccess,
  createMeFailure,

  //Delete
  deleteMeRequest,
  deleteMeSuccess,
  deleteMeFailure,

  //Recovery
  recoveryUserRequest,
  recoveryUserSuccess,
  recoveryUserFailure,

  //Load me
  loadMeRequest,
  loadMeSuccess,
  loadMeFailure,
  loadUserByEmailRequest,
  loadUserByEmailSuccess,
  loadUserByEmailFailure,
} from './actions'
import { User } from '../users/types'

//Login
export function* loginUser(payload: ReturnType<typeof loginUserRequest>) {
  try {
    const response: User = yield call(api.post, 'login', payload.payload) //Payload.payload está ok
    yield put(loginUserSuccess(response))
  } catch (error: any) {
    yield put(loginUserFailure(error.response.data))
  }
}

//Recovery
export function* recoveryUser(payload: ReturnType<typeof recoveryUserRequest>) {
  try {
    const response: string = yield call(api.post, 'recovery', {email: payload.payload}) //Payload.payload está ok
    yield put(recoveryUserSuccess(response))
  } catch (error: any) {
    yield put(recoveryUserFailure(error.response.data))
  }
}

//Load me
export function* loadMe(payload: ReturnType<typeof loadMeRequest>) {
  try {
    const response: User = yield call(api.post, 'userrecovery', payload.payload)
    yield put(loadMeSuccess(response))
  } catch (error: any) {
    yield put(loadMeFailure(error.response.data))
  }
}

//Load User By Email
export function* loadUserByEmail(payload: ReturnType<typeof loadUserByEmailRequest>) {
  
  try {
    put(loadUserByEmailRequest(payload.payload))
    const response: User = yield call(api.get, 'user/email/'+ payload.payload)
    yield put(loadUserByEmailSuccess(response))
  } catch (error: any) {
    yield put(loadUserByEmailFailure(error.response.data))
  }
}

//Create
export function* createMe(payload: ReturnType<typeof createMeRequest>) {
  try {
    put(createMeRequest(payload.payload))
    const response: User = yield call(api.post, 'user', payload.payload)
    yield put(createMeSuccess(response))
  } catch (error: any) {
    yield put(createMeFailure(error.response.data))
  }
}

//Update
export function* updateMe(payload: ReturnType<typeof updateMeRequest>) {
  try {
    const response: User = yield call(api.patch, 'user/'+payload.payload.id, payload.payload)
    // console.log("NEW PASSWORD", payload.payload.newPassword)
    //response.data.newPassword = payload.payload.newPassword //Pra pegar a senha na próxima pagina
    yield put(updateMeSuccess(response, payload.payload.newPassword))
  } catch (error: any) {
    yield put(updateMeFailure(error.response.data))
  }
}

//Delete
export function* deleteMe(payload: ReturnType<typeof deleteMeRequest>) {
  try {
    const response: User = yield call(api.delete, 'users/' + payload.payload)
    yield put(deleteMeSuccess(response))
  } catch (error: any) {
    yield put(deleteMeFailure(error.response.data))
  }
}
