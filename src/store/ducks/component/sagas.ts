import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  loadComponentRequest,
  loadComponentSuccess,
  loadComponentFailure,
  loadComponentByDescriptionRequest,
  loadComponentByDescriptionSuccess,
  loadComponentByDescriptionFailure,
  createComponentRequest,
  createComponentSuccess,
  createComponentFailure,
  updateComponentRequest,
  updateComponentSuccess,
  updateComponentFailure,
  deleteComponentRequest,
  deleteComponentSuccess,
  deleteComponentFailure,
  createExtraRequest,
  createExtraSuccess,
  createExtraFailure,
  updateExtraRequest,
  updateExtraSuccess,
  updateExtraFailure,

  // uploadExtraRequest,
  // uploadExtraSuccess,
  // uploadExtraFailure,
  deleteExtraRequest,
  deleteExtraSuccess,
  deleteExtraFailure,
  loadModulesRequest,
  loadModulesSuccess,
  loadModulesFailure,
  loadClassesRequest,
  loadClassesSuccess,
  loadClassesFailure,
  createAulaConcluidaFailure,
  createAulaConcluidaRequest,
  createAulaConcluidaSuccess,
  deleteAulaConcluidaFailure,
  deleteAulaConcluidaRequest,
  deleteAulaConcluidaSuccess,
  // loadCourseRequest,
} from './actions'

import {Component} from './types'
import {AulaConcluida} from '../aulaconcluida/types'

// import { loadExtrasSuccess } from '../extras/actions'
import {Extras} from '../extras/types'
// import axios from 'axios';

//Load Component
export function* loadComponent(payload: ReturnType<typeof loadComponentRequest>) {
  try {
    put(loadComponentRequest(payload.payload))
    const response: Component = yield call(api.get, 'components/' + payload.payload)
    yield put(loadComponentSuccess(response))
  } catch (error) {
    yield put(loadComponentFailure())
  }
}

//Load Modules
export function* loadModules(payload: ReturnType<typeof loadModulesRequest>) {
  try {
    put(loadModulesRequest(payload.payload.id, payload.payload.user_id, payload.payload.num_turma))
    const response: Component = yield call(
      api.get,
      'components/modules/' +
        payload.payload.id +
        '/' +
        payload.payload.user_id +
        '/' +
        payload.payload.num_turma
    )
    yield put(loadModulesSuccess(response))
  } catch (error) {
    yield put(loadModulesFailure())
  }
}

//Load Classes
export function* loadClasses(payload: ReturnType<typeof loadClassesRequest>) {
  // console.log("loadComponent SAGA", payload)
  try {
    put(loadClassesRequest(payload.payload.id, payload.payload.user_id))
    const response: Component = yield call(
      api.get,
      'components/classes/' + payload.payload.id + '/' + payload.payload.user_id
    )
    yield put(loadClassesSuccess(response))
  } catch (error) {
    yield put(loadClassesFailure())
  }
}

//Load Course:
// export function* loadCourse(payload:ReturnType<typeof loadCourseRequest>) {
//     // console.log("loadComponent SAGA", payload)
//     try {

//         put(loadComponentRequest(payload.payload))
//         const response : Component = yield call(api.get, 'readCourse/'+payload.payload);
//         yield put(loadComponentSuccess(response));

//     } catch (error) {
//         yield put(loadComponentFailure());
//     }
// }

//Load Component by Description
export function* loadComponentByDescription(
  payload: ReturnType<typeof loadComponentByDescriptionRequest>
) {
  try {
    put(loadComponentByDescriptionRequest(payload.payload))
    const response: Component = yield call(api.get, 'componentsbydesc/' + payload.payload)
    yield put(loadComponentByDescriptionSuccess(response))
  } catch (error) {
    yield put(loadComponentByDescriptionFailure())
  }
}

//Create Component
export function* createComponent(payload: ReturnType<typeof createComponentRequest>) {
  try {
    const response: Component = yield call(api.post, 'components', payload.payload)
    yield put(createComponentSuccess(response))
  } catch (error: any) {
    yield put(createComponentFailure(error.response.data))
  }
}

//Update Component
export function* updateComponent(payload: ReturnType<typeof updateComponentRequest>) {
  try {
    put(updateComponentRequest(payload.payload))
    const response: Component = yield call(api.post, 'components', payload.payload)
    yield put(updateComponentSuccess(response))
  } catch (error) {
    yield put(updateComponentFailure())
  }
}

//Delete Component
export function* deleteComponent(payload: ReturnType<typeof deleteComponentRequest>) {
  try {
    const number: number = yield call(api.delete, 'components/' + payload.payload)
    yield put(deleteComponentSuccess(number))
  } catch (error) {
    yield put(deleteComponentFailure())
  }
}

////////////////////////////////////////// EXTRAS //////////////////////////////////////////

//Create Extra
export function* createExtra(payload: ReturnType<typeof createExtraRequest>) {
  try {
    const response: Extras = yield call(api.post, 'extras', payload.payload)
    yield put(createExtraSuccess(response))
  } catch (error: any) {
    yield put(createExtraFailure(error.response.data))
  }
}

// export function* uploadExtra(payload:ReturnType<typeof uploadExtraRequest>) {
//     try {
//         console.log("--------UPLOAD EXTRA------ ################PAYLOOOOOOOOOAD", payload)

//         // put(updateExtraRequest(payload.payload))
//         // const response : Extras = yield call(api.post, 'upload', payload.payload, { });
//         const response : Extras = yield axios.post("http://localhost:8887/upload", payload, { });
//         yield put(createExtraSuccess(response));
//         yield console.log('response', response)
//     } catch (error) {
//         yield put(createExtraFailure(error));
//     }
// }

//Update Extra
export function* updateExtra(payload: ReturnType<typeof updateExtraRequest>) {
  try {
    put(updateExtraRequest(payload.payload))
    const response: Extras = yield call(api.post, 'extras', payload.payload)
    yield put(updateExtraSuccess(response))
  } catch (error) {
    yield put(updateExtraFailure())
  }
}

//Delete Extra
export function* deleteExtra(payload: ReturnType<typeof deleteExtraRequest>) {
  try {
    const number: number = yield call(api.delete, 'extras/' + payload.payload)
    yield put(deleteExtraSuccess(number))
  } catch (error) {
    yield put(deleteExtraFailure())
  }
}

//Concluir Aula Concluida
export function* createAulaConcluida(payload: ReturnType<typeof createAulaConcluidaRequest>) {
  try {
    put(
      createAulaConcluidaRequest(
        payload.payload.user_id,
        payload.payload.component_id,
        payload.payload.parent_id
      )
    )
    const response: AulaConcluida = yield call(api.post, 'aulaconcluida', payload.payload)
    yield put(createAulaConcluidaSuccess(response, payload.payload.parent_id))
  } catch (error: any) {
    yield put(createAulaConcluidaFailure(error.response.data))
  }
}

//Delete Aula Concluida
export function* deleteAulaConcluida(payload: ReturnType<typeof deleteAulaConcluidaRequest>) {
  try {
    const number: number = yield call(api.delete, 'aulaconcluida/' + payload.payload.id)
    yield put(deleteAulaConcluidaSuccess(number, payload.payload.aula))
  } catch (error: any) {
    yield put(deleteAulaConcluidaFailure(error.response.data))
  }
}
