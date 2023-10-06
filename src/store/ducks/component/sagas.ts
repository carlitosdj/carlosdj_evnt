import { call, put } from "redux-saga/effects";
import api from "../../../services/api";

import {
  loadComponentByDescriptionRequest,
  loadComponentByDescriptionSuccess,
  loadComponentByDescriptionFailure,
} from "./actions";

import { Component } from "./types";

//Load Component by Description
export function* loadComponentByDescription(
  payload: ReturnType<typeof loadComponentByDescriptionRequest>
) {
  try {
    put(loadComponentByDescriptionRequest(payload.payload));
    const response: Component = yield call(
      api.get,
      "component/description/" + payload.payload
    );
    //console.log("response", response);
    yield put(loadComponentByDescriptionSuccess(response));
  } catch (error) {
    yield put(loadComponentByDescriptionFailure());
  }
}
