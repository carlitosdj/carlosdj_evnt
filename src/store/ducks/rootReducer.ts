import {combineReducers} from 'redux'
// import repositories from './repositories';
import users from './users'
import me from './me'
import component from './component'
import lead from './lead'

import payment from './payment'
import city from './city'
import state from './state'
import wppcamp from './wppcamp'
import wppgroup from './wppgroup'

export default combineReducers({
  users,
  me,
  component,
  lead,
  payment,
  city,
  state,
  wppcamp,
  wppgroup
})
