import { USER_LOGIN } from '../../constants/actionTypes'

// 리듀서 전역데이터 관리 초기값 구조정의 및 값할당
const INIT_STATE = {
  token: '',
  loginUser: {},
}

// Auth 리듀서 함수 정의
const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        loginUser: action.payload.loginUser,
      }
    default:
      // INIT_STATE로 정의 했던 상태의 복사본
      return { ...state }
  }
}

export default Auth
