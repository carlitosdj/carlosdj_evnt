import { State } from "../state/types";
import { City } from "../city/types";

/**
 * Action types
 */
export enum UsersTypes {
  //All
  LOAD_USERS_REQUEST = "@users/LOAD_USERS_REQUEST",
  LOAD_USERS_SUCCESS = "@users/LOAD_USERS_SUCCESS",
  LOAD_USERS_FAILURE = "@users/LOAD_USERS_FAILURE",

  //Single user: -> "readOne" / "readByEmail"
  LOAD_USER_REQUEST = "@users/LOAD_USER_REQUEST",
  LOAD_USER_SUCCESS = "@users/LOAD_USER_SUCCESS",
  LOAD_USER_FAILURE = "@users/LOAD_USER_FAILURE",

  //Search
  SEARCH_USERS_REQUEST = "@users/SEARCH_USERS_REQUEST",
  SEARCH_USERS_SUCCESS = "@users/SEARCH_USERS_SUCCESS",
  SEARCH_USERS_FAILURE = "@users/SEARCH_USERS_FAILURE",

  //Create
  CREATE_USER_REQUEST = "@users/CREATE_USER_REQUEST",
  CREATE_USER_SUCCESS = "@users/CREATE_USER_SUCCESS",
  CREATE_USER_FAILURE = "@users/CREATE_USER_FAILURE",

  //Update
  UPDATE_USER_REQUEST = "@users/UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS = "@users/UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILURE = "@users/UPDATE_USER_FAILURE",

  //Delete
  DELETE_USER_REQUEST = "@users/DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS = "@users/DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE = "@users/DELETE_USER_FAILURE",
}

export interface User {
  id?: number;
  email?: string;
  password_hash?: string;
  newPassword?: string;
  auth_key?: string;
  confirmed_at?: number;
  blocked_at?: number;
  registration_ip?: string;
  created_at?: number;
  updated_at?: number;
  flag?: number;
  last_login_at?: number;
  origin?: string;
  num_turma?: number;
  name?: string;
  bio?: string;
  whatsapp?: string;
  cpf?: string;
  postalCode?: string;
  address?: string;
  addressNumber?: string;
  addressDistrict?: string;
  image?: string;
  city_id?: number;
  state_id?: number;
  roles?: string;
  cityParent?: City;
  stateParent?: State;
  city?: City;
  state?: State;
  country?: string;
}

/**
 * State type
 */
export interface UsersState {
  readonly data: User[];
  readonly loading: boolean;
  readonly error: boolean;
}
