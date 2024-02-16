import { call, put } from "redux-saga/effects";
import api from "../../../services/api";

import {
  //Load
  loadLeadRequest,
  loadLeadSuccess,
  loadLeadFailure,

  //Create
  createLeadRequest,
  createLeadSuccess,
  createLeadFailure,

  //Update
  confirmLeadRequest,
  confirmLeadSuccess,
  confirmLeadFailure,

  //Not Disturb
  notDisturbLeadRequest,
  notDisturbLeadSuccess,
  notDisturbLeadFailure,

  //sendEmail
  sendEmailRequest,
  sendEmailSuccess,
  sendEmailFailure,
} from "./actions";

import { Lead } from "./types";

//Load
export function* loadLead(payload: ReturnType<typeof loadLeadRequest>) {
  try {
    put(loadLeadRequest(payload.payload.email, payload.payload.list));
    const response: Lead = yield call(
      api.get,
      "lead/load/" + payload.payload.list + "/" + payload.payload.email
    );
    yield put(loadLeadSuccess(response));
  } catch (error: any) {
    yield put(loadLeadFailure(error.response.data));
  }
}

//Create
export function* createLead(payload: ReturnType<typeof createLeadRequest>) {
  console.log("Trying to create lead...")
  try {
    put(createLeadRequest(payload.payload));
    const response: Lead = yield call(api.post, "lead", payload.payload);
    yield put(createLeadSuccess(response));
  } catch (error: any) {
    console.log("Error", error)
    yield put(createLeadFailure(error.response.data));
  }
}

//Update
export function* confirmLead(payload: ReturnType<typeof confirmLeadRequest>) {
  try {
    put(confirmLeadRequest(payload.payload.email, payload.payload.list));
    const response: Lead = yield call(api.get,
      "lead/confirm/" + payload.payload.list + "/" + payload.payload.email);
    yield put(confirmLeadSuccess(response));
  } catch (error: any) {
    yield put(confirmLeadFailure(error.response.data));
  }
}

//Delete
export function* notDisturbLead(
  payload: ReturnType<typeof notDisturbLeadRequest>
) {
  try {
    put(notDisturbLeadRequest(payload.payload.email, payload.payload.list));
    const response: Lead = yield call(api.get,
      "lead/notdisturb/" + payload.payload.list + "/" + payload.payload.email);
    yield put(notDisturbLeadSuccess(response));
  } catch (error: any) {
    yield put(notDisturbLeadFailure(error.response.data));
  }
}

//sendEmail
export function* sendEmail(payload: ReturnType<typeof sendEmailRequest>) {
  try {
    put(
      sendEmailRequest(
        payload.payload.email,
        payload.payload.title,
        payload.payload.message
      )
    );
    const response: Lead = yield call(api.post, "sendemail", payload.payload);
    yield put(sendEmailSuccess(response));
  } catch (error: any) {
    yield put(sendEmailFailure(error.response.data));
  }
}
