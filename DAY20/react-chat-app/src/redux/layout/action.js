// 각종 액션 타입별 액션함수 정의
// payload: 전달할 데이터 (파라메터)
// STEP1: 액션타입 참조하기
import { SET_ACTIVE_TAB, OPEN_USER_PROFILE_SIDEBAR, SET_LAYOUT_MODE } from '../../constants/actionTypes'

// STEP2: 액션타입별 액션함수 구현하기
// UI컴포넌트에서 Dispatch를 통해 호출하는 액션함수기능정의(컴포넌트에서 전달해오는 데이터구조정의)
// (tabId) => 화면에서 넘어오는 데이터(payload)
export const setActiveTab = (tabId) => ({
  type: SET_ACTIVE_TAB,
  payload: tabId,
})

// 우측 사용자 프로필 영역 디스플레이상태를 boolean 형으로 관리하고
// 전역데이터값이 true이면 false, false이면 true로 바꾸기만하면 되기때문에
// 굳이 화면에서 데이터를 전달받을 필요가 없기 때문에 payload가 없다.
export const openUserSideBar = () => ({
  type: OPEN_USER_PROFILE_SIDEBAR,
})

export const changeLayoutMode = (layoutMode) => ({
  type: SET_LAYOUT_MODE,
  payload: layoutMode,
})
