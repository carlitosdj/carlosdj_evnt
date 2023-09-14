import {action} from 'typesafe-actions'
import {ComponentTypes} from './types'
import {AulaConcluidaTypes, AulaConcluida} from '../aulaconcluida/types'
import {Component} from './types'
import {Extras} from '../extras/types'

//Load
export const loadComponentRequest = (id: string) =>
  action(ComponentTypes.LOAD_COMPONENT_REQUEST, id)
export const loadComponentSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_COMPONENT_SUCCESS, data)
export const loadComponentFailure = () => action(ComponentTypes.LOAD_COMPONENT_FAILURE)

//Load Modules
export const loadModulesRequest = (id: string, user_id: number, num_turma: number) =>
  action(ComponentTypes.LOAD_MODULES_REQUEST, {id, user_id, num_turma})
export const loadModulesSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_MODULES_SUCCESS, data)
export const loadModulesFailure = () => action(ComponentTypes.LOAD_MODULES_FAILURE)

//Load Classes
export const loadClassesRequest = (id: string, user_id: number) =>
  action(ComponentTypes.LOAD_CLASSES_REQUEST, {id, user_id})
export const loadClassesSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_CLASSES_SUCCESS, data)
export const loadClassesFailure = () => action(ComponentTypes.LOAD_CLASSES_FAILURE)

//Load Component by Description
export const loadComponentByDescriptionRequest = (id: string) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_REQUEST, id)
export const loadComponentByDescriptionSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_SUCCESS, data)
export const loadComponentByDescriptionFailure = () =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_FAILURE)

//Create Component
export const createComponentRequest = (newComponent: Component) =>
  action(ComponentTypes.CREATE_COMPONENT_REQUEST, newComponent)
export const createComponentSuccess = (data: Component) =>
  action(ComponentTypes.CREATE_COMPONENT_SUCCESS, data)
export const createComponentFailure = (err: any[]) =>
  action(ComponentTypes.CREATE_COMPONENT_FAILURE, err)

//Update Component
export const updateComponentRequest = (componentToUpdate: Component) =>
  action(ComponentTypes.UPDATE_COMPONENT_REQUEST, componentToUpdate)
export const updateComponentSuccess = (data: Component) =>
  action(ComponentTypes.UPDATE_COMPONENT_SUCCESS, data)
export const updateComponentFailure = () => action(ComponentTypes.UPDATE_COMPONENT_FAILURE)

//Delete Component
export const deleteComponentRequest = (id: number) =>
  action(ComponentTypes.DELETE_COMPONENT_REQUEST, id)
export const deleteComponentSuccess = (id: number) =>
  action(ComponentTypes.DELETE_COMPONENT_SUCCESS, id)
export const deleteComponentFailure = () => action(ComponentTypes.DELETE_COMPONENT_FAILURE)

//Create Extra
export const createExtraRequest = (newExtra: Extras) =>
  action(ComponentTypes.CREATE_EXTRA_REQUEST, newExtra)
export const createExtraSuccess = (data: Extras) =>
  action(ComponentTypes.CREATE_EXTRA_SUCCESS, data)
export const createExtraFailure = (err: any[]) => action(ComponentTypes.CREATE_EXTRA_FAILURE, err)

export const uploadExtraRequest = (newExtra: Extras, image: FormData) =>
  action(ComponentTypes.UPLOAD_EXTRA_REQUEST, newExtra, image)
// export const uploadExtraSuccess = (data: Extras) => action(ComponentTypes.UPLOAD_EXTRA_SUCCESS, data)
// export const uploadExtraFailure = (err: any[]) => action(ComponentTypes.UPLOAD_EXTRA_FAILURE, err)

//Update Extra
export const updateExtraRequest = (extraToUpdate: Component) =>
  action(ComponentTypes.UPDATE_EXTRA_REQUEST, extraToUpdate)
export const updateExtraSuccess = (data: Extras) =>
  action(ComponentTypes.UPDATE_EXTRA_SUCCESS, data)
export const updateExtraFailure = () => action(ComponentTypes.UPDATE_EXTRA_FAILURE)

//Delete Extra
export const deleteExtraRequest = (id: number) => action(ComponentTypes.DELETE_EXTRA_REQUEST, id)
export const deleteExtraSuccess = (id: number) => action(ComponentTypes.DELETE_EXTRA_SUCCESS, id)
export const deleteExtraFailure = () => action(ComponentTypes.DELETE_EXTRA_FAILURE)

//Single Aula Concluida
export const createAulaConcluidaRequest = (
  user_id: number,
  component_id: number,
  parent_id: number
) => action(AulaConcluidaTypes.CREATE_AULACONCLUIDA_REQUEST, {user_id, component_id, parent_id})
export const createAulaConcluidaSuccess = (data: AulaConcluida, parent_id: number) =>
  action(AulaConcluidaTypes.CREATE_AULACONCLUIDA_SUCCESS, {data, parent_id})
export const createAulaConcluidaFailure = (error: {}) =>
  action(AulaConcluidaTypes.CREATE_AULACONCLUIDA_FAILURE, error)

//Create Aula Concluida
export const deleteAulaConcluidaRequest = (id: number, aula: Component) =>
  action(AulaConcluidaTypes.DELETE_AULACONCLUIDA_REQUEST, {id, aula})
export const deleteAulaConcluidaSuccess = (id: number, aula: Component) =>
  action(AulaConcluidaTypes.DELETE_AULACONCLUIDA_SUCCESS, {id, aula})
export const deleteAulaConcluidaFailure = (error: {}) =>
  action(AulaConcluidaTypes.DELETE_AULACONCLUIDA_FAILURE, error)
