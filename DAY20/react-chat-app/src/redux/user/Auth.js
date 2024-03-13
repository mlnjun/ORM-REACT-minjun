import { USER_LOGIN } from '../../constants/actionTypes'
import moment from 'moment'
import { INIT_STATE } from './reducer'

// 리듀서 함수
export const Auth = (state = INIT_STATE, action) => {
  action.payload.loginUser.reg_date = moment(action.payload.loginUser.reg_date).format('YYYY-MM-DD hh:mm')
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        loginUser: action.payload.loginUser,
      }
    default:
      return { ...state }
  }
}
