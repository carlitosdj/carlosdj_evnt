import { all, takeLatest } from "redux-saga/effects";

import { UsersTypes } from "./users/types";
import {
  loadUsers,
  // findUserId,
  searchUser,
  createUser,
  updateUser,
  deleteUser,
} from "./users/sagas";

import { MeTypes } from "./me/types";
import {
  loginUser,
  createMe,
  updateMe,
  deleteMe,
  recoveryUser,
  loadMe,
  loadUserByEmail,
} from "./me/sagas";

import { ComponentTypes } from "./component/types";
import {
  // loadComponent,
  // createComponent,
  // updateComponent,
  // deleteComponent,
  // createExtra,
  // updateExtra,
  // deleteExtra,
  loadComponentByDescription,
  // loadModules,
  // loadClasses,
  // uploadExtra
} from "./component/sagas";

import { LeadTypes } from "./lead/types";
import {
  loadLead,
  createLead,
  confirmLead,
  notDisturbLead,
  sendEmail,
} from "./lead/sagas";

import { PaymentTypes } from "./payment/types";
import {
  createPagarMeOrder,
  createPayment,
  createPaymentPixBoleto,
} from "./payment/sagas";
import { StateTypes } from "./state/types";
import { CityTypes } from "./city/types";
import { loadState } from "./state/sagas";
import { loadCity } from "./city/sagas";
import { WppcampTypes } from "./wppcamp/types";
import { WppgroupTypes } from "./wppgroup/types";
import { createWppcamp, deleteWppcamp, loadAllwppcamps, loadWppcamps, loadWppgroupavailable, updateWppcamp } from "./wppcamp/sagas";
import { createWppgroup, deleteWppgroup, loadWppgroups, updateWppgroup } from "./wppgroup/sagas";

export default function* rootSaga() {
  yield all([
    //Me
    takeLatest(MeTypes.LOGIN_USER_REQUEST, loginUser),
    takeLatest(MeTypes.UPDATE_USER_REQUEST, updateMe),
    takeLatest(MeTypes.CREATE_USER_REQUEST, createMe),
    takeLatest(MeTypes.DELETE_USER_REQUEST, deleteMe),
    takeLatest(MeTypes.RECOVERY_USER_REQUEST, recoveryUser),
    takeLatest(MeTypes.LOAD_ME_REQUEST, loadMe),
    takeLatest(MeTypes.LOAD_USERBYEMAIL_REQUEST, loadUserByEmail),

    //Users
    takeLatest(UsersTypes.LOAD_USERS_REQUEST, loadUsers),
    takeLatest(UsersTypes.UPDATE_USER_REQUEST, updateUser),
    takeLatest(UsersTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(UsersTypes.DELETE_USER_REQUEST, deleteUser),
    takeLatest(UsersTypes.SEARCH_USERS_REQUEST, searchUser),

    //Components
    takeLatest(
      ComponentTypes.LOAD_COMPONENT_BY_DESC_REQUEST,
      loadComponentByDescription
    ),

    //Lead
    takeLatest(LeadTypes.LOAD_LEAD_REQUEST, loadLead),
    takeLatest(LeadTypes.CREATE_LEAD_REQUEST, createLead),
    takeLatest(LeadTypes.CONFIRM_LEAD_REQUEST, confirmLead),
    takeLatest(LeadTypes.NOTDISTURB_LEAD_REQUEST, notDisturbLead),
    takeLatest(LeadTypes.CREATE_SENDEMAILSINGLE_REQUEST, sendEmail),

    // takeLatest(ClientTypes.LOAD_CLIENT_REQUEST, loadClient),
    takeLatest(PaymentTypes.CREATE_PAYMENT_REQUEST, createPayment),
    takeLatest(
      PaymentTypes.CREATE_PAYMENT_PIX_BOLETO_REQUEST,
      createPaymentPixBoleto
    ),
    takeLatest(PaymentTypes.CREATE_PAGARME_ORDER_REQUEST, createPagarMeOrder),

    takeLatest(StateTypes.LOAD_STATES_REQUEST, loadState),
    takeLatest(CityTypes.LOAD_CITIES_REQUEST, loadCity),

    //Wppcamp
    takeLatest(WppcampTypes.LOAD_ALLCAMP_REQUEST, loadAllwppcamps),
    takeLatest(WppcampTypes.LOAD_CAMP_REQUEST, loadWppcamps),
    takeLatest(WppcampTypes.CREATE_CAMP_REQUEST, createWppcamp),
    takeLatest(WppcampTypes.UPDATE_CAMP_REQUEST, updateWppcamp),
    takeLatest(WppcampTypes.DELETE_CAMP_REQUEST, deleteWppcamp),
    takeLatest(WppcampTypes.LOAD_WPPGROUPAVAILABLE_REQUEST, loadWppgroupavailable),

    //Wppgroup
    takeLatest(WppgroupTypes.LOAD_WPPGROUPS_REQUEST, loadWppgroups),
    takeLatest(WppgroupTypes.CREATE_WPPGROUP_REQUEST, createWppgroup),
    takeLatest(WppgroupTypes.UPDATE_WPPGROUP_REQUEST, updateWppgroup),
    takeLatest(WppgroupTypes.DELETE_WPPGROUP_REQUEST, deleteWppgroup),
  ]);
  // console.log('mounting saga...')
}
