// import { ComponentAvailable } from '../componentavailable/types';
import { Extras } from "../extras/types";
/**
 * Action types
 */
export enum ComponentTypes {
  LOAD_COMPONENT_BY_DESC_REQUEST = "@component/LOAD_COMPONENT_BY_DESC_REQUEST",
  LOAD_COMPONENT_BY_DESC_SUCCESS = "@component/LOAD_COMPONENT_BY_DESC_SUCCESS",
  LOAD_COMPONENT_BY_DESC_FAILURE = "@component/LOAD_COMPONENT_BY_DESC_FAILURE",
}

/**
 * Data types
 */
// User Imported from Me
export interface Component {
  id?: number;
  component_id?: number;
  name?: string;
  description?: string;
  created_at?: string;
  status?: number | boolean;
  order?: string;
  children?: Component[] | undefined;
  extras?: Extras[];
  parent?: Component | undefined;
  componentavailable?: any;
}
/**
 * State type
 */
export interface ComponentState {
  readonly modules: Component[];
  readonly classes: Component[];
  readonly data: Component;
  readonly loading: boolean;
  readonly error: boolean;
  readonly loadingAulaConcluida: boolean;
  readonly loadingAulaConcluidaId?: number;
}
