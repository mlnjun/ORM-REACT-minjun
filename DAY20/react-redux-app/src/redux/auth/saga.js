// redux-saga 주요 헬퍼함수 참조하기
import { all, call, folk, fork, put, takeEvery } from 'redux-saga/effects'

// axios apiClient 참조하기
import { APIClient } from '../../helpers/apiClient'

// 액션 타입 참조
import { LOGIN_USER, API_FAILED } from '../../constants/actionTypes'

// 액션 함수를 참조
// 회원로그인 처리 액션함수를 참조한다.
import { loginUser, apiError, userLogin } from './action'

// 백엔드 RESTful 통신을 위한 APIClient post메소드(create()) 함수 생성하기
const create = new APIClient().create

// 로그인 백엔드 통신 처리를 위한 제너레이터 함수 정의
// 로그인처리 SAGA 제너레이터 함수
function* login({ payload: { email, password, navigate } }) {
  try {
    // call(백엔드 호출함수 지정)
    const response = yield call(create, 'api/member/login', { email, password })

    // 웹브라우저 로컬 스토리지 저장 : 옵션
    localStorage.setItem('authUser', response.data.loginUser)
    localStorage.setItem('authToken', response.data.token)

    // 전역 스토어에 로그인 사용자 정보 값 반영하기
    // put(실행할 액션함수지정);  스토에의 전역 상태값 변경처리
    yield put(userLogin(response.data.token, response.data.loginUser))

    // 로그인 완료 후 특정페이지로 이동처리
    navigate('/dashboard')
  } catch (err) {
    yield put(apiError(err))
  }
}

// 제너레이터 함수를 노출합니다.
// watchLoginUser() 함수를 정의하고 기능을 노출하면 추후 관련 액션함수가 실행되면 자동으로 saga제너레이터 함수가 실행된다.
export function* watchLoginUser() {
  // takeEvery(액션타입, 액션 saga함수) 함수의 목적 : 전달되는 액션타입 별 액션함수를 실행시켜주는 기능제공
  yield takeEvery(LOGIN_USER, login)
}

// 사용자 인증 Saga함수를 정의하고 최종 saga함수를 노출시킵니다.
function* authSaga() {
  // all(배열안에 해당 saga함수를 fork메소드로 감싸서 배열형태로 여러개 제공[])
  // all 함수는 실행해야할 사가함수들을 배열에 넣고 여러개을 동시에 실행시킬수 있는 기능 제공
  // fork 헬퍼함수는 비동기 기반 함수를 실행할 때 사용한다.
  yield all([fork(watchLoginUser)])
  // yield all([fork(watchLoginUser), fork(watchLoginUser), fork(watchLoginUser), fork(watchLoginUser)])
}

export default authSaga
