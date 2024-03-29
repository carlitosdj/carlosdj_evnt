import {call, put, fork} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadStateFailure,
  loadStateRequest,
  loadStateSuccess
} from './actions'

import {State} from './types'

//Load
export function* loadState(payload: ReturnType<typeof loadStateRequest>) {
  try {
    put(loadStateRequest())
    const response: State[] = yield call(api.get, 'state/')
    yield put(loadStateSuccess(response))
  } catch (error: any) {
    yield put(loadStateFailure(error.reponse.data))
  }
}
