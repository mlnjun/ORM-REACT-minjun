import { USER_LOGIN } from '../../constants/actionTypes'

// 전역데이터 초기값, 구조 정의
const INIT_STATE = {
  token: '',
  loginUser: {},
}

// 리듀서 함수
const Auth = (state = INIT_STATE, action) => {
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

export default Auth
