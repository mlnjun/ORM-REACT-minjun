// all 헬퍼함수 참조 모든 업무별 saga파일에서 구현한
// saga제너레이터 함수를 배열안에 통합해 추가한다.
import { all } from "redux-saga/effects";


import authSaga from "./auth/saga";
//import LayoutSaga from './layout/saga';

export default function* rootSaga(getState) {
  yield all([authSaga()]);
  // yield all([authSaga(), authSaga(), authSaga()]);
}