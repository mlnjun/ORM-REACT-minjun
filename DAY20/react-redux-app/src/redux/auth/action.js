import { USER_LOGIN, API_FAILED, LOGIN_USER } from '../../constants/actionTypes'

// 실제 사용자 로그인 처리 액션함수:사가함수
export const loginUser = (email, password, navigate) => ({
  type: LOGIN_USER,
  payload: { email, password, navigate },
})

// 로그인 완료 후 로그인 사용자 정보 전역업데이트 액션함수: 순수 리덕스
export const userLogin = (token, loginUser) => ({
  type: USER_LOGIN,
  payload: { token, loginUser },
})

export const apiError = (error) => ({
  type: API_FAILED,
  payload: error,
})

