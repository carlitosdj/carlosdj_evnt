import {action} from 'typesafe-actions'
import {ComponentTypes} from './types'
import {Component} from './types'

//Load Component by Description
export const loadComponentByDescriptionRequest = (id: string) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_REQUEST, id)
export const loadComponentByDescriptionSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_SUCCESS, data)
export const loadComponentByDescriptionFailure = (err: any[]) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_FAILURE, err)
