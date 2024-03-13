//  STEP1 : 해당 액션과 관련된 애션타입을 참조한다.
import { TODO_COUNT } from '../../constants/actionTypes'

// STEP2 : 액션함수 정의하기
// 액션함수 기본구조 : (컴포넌트에서 전달되는 데이터) => (액션객체 정의 {type:액션타입, payload:{리듀서로 전달되는 데이터 구조: 컴포넌트에서 전달되는 데이터}})
export const addTodoCount = (todoCount) => ({
  type: TODO_COUNT,
  payload: { todoCount },
})
