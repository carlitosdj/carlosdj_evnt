import { Reducer } from "redux";
import { ComponentState, ComponentTypes } from "./types";

const INITIAL_STATE: ComponentState = {
  data: {},
  modules: [],
  classes: [],
  error: false,
  loading: false,
  loadingAulaConcluida: false,
};

const reducer: Reducer<ComponentState> = (state = INITIAL_STATE, action) => {
  // console.log('################################Reducer inside Component: ' + action.type + ':', action)
  switch (action.type) {
    case ComponentTypes.LOAD_COMPONENT_BY_DESC_REQUEST:
      return { ...state, loading: true };
    case ComponentTypes.LOAD_COMPONENT_BY_DESC_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case ComponentTypes.LOAD_COMPONENT_BY_DESC_FAILURE:
      return { ...state, loading: false, error: action.payload, data: {} };

    default:
      return state;
  }
};

export default reducer;
