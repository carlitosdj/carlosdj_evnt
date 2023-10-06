import {action} from 'typesafe-actions'
import {MeTypes, Login} from './types'
import { User } from '../users/types'

//Login
export const loginUserRequest = (loginParams: Login) =>
  action(MeTypes.LOGIN_USER_REQUEST, loginParams)
export const loginUserSuccess = (data: User) => action(MeTypes.LOGIN_USER_SUCCESS, data)
export const loginUserFailure = () => action(MeTypes.LOGIN_USER_FAILURE)
export const authfromcookie = (data: User) => action(MeTypes.AUTH_FROM_COOKIE, data)

//Recovery
export const recoveryUserRequest = (email: string) => action(MeTypes.RECOVERY_USER_REQUEST, email)
export const recoveryUserSuccess = (response: string) =>
  action(MeTypes.RECOVERY_USER_SUCCESS, response)
export const recoveryUserFailure = () => action(MeTypes.RECOVERY_USER_FAILURE)

//Logout
export const logoutUser = () => action(MeTypes.LOGOUT_USER)

//Load me: - for recovery
export const loadMeRequest = (email: string, auth_key: string) =>
  action(MeTypes.LOAD_ME_REQUEST, {email, auth_key})
export const loadMeSuccess = (data: User) => action(MeTypes.LOAD_ME_SUCCESS, data)
export const loadMeFailure = () => action(MeTypes.LOAD_ME_FAILURE)

//Load user by email
export const loadUserByEmailRequest = (email: string) =>
  action(MeTypes.LOAD_USERBYEMAIL_REQUEST, email)
export const loadUserByEmailSuccess = (data: User) => action(MeTypes.LOAD_USERBYEMAIL_SUCCESS, data)
export const loadUserByEmailFailure = (err: any[]) => action(MeTypes.LOAD_USERBYEMAIL_FAILURE, err)

//Create
export const createMeRequest = (newUser: User) => action(MeTypes.CREATE_USER_REQUEST, newUser)
export const createMeSuccess = (data: User) => action(MeTypes.CREATE_USER_SUCCESS, data)
export const createMeFailure = (err: any[]) => action(MeTypes.CREATE_USER_FAILURE, err)

//Update
export const updateMeRequest = (userToUpdate: User) =>
  action(MeTypes.UPDATE_USER_REQUEST, userToUpdate)
export const updateMeSuccess = (data: User, newPassword?: string) => action(MeTypes.UPDATE_USER_SUCCESS, {data, newPassword})
export const updateMeFailure = (err: any[]) => action(MeTypes.UPDATE_USER_FAILURE, err)

//Delete
export const deleteMeRequest = (userId: number) => action(MeTypes.DELETE_USER_REQUEST, userId)
export const deleteMeSuccess = (data: User) => action(MeTypes.DELETE_USER_SUCCESS, data)
export const deleteMeFailure = () => action(MeTypes.DELETE_USER_FAILURE)
