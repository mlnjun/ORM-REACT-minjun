// 어플리케이션 컨텍스트 프로바이더 에서 제공하는 전역 데이터 참조를 위한 useContext훅 참조하기
import React, { useContext } from 'react'

// 전역상태 정보관리 컨텍스트 객체 참조하기
import { AppContext } from '../App'

const Counter = () => {
  // 카운터 전역 데이터 값 추출하기
  const [count] = useContext(AppContext)

  return (
    <div>
      <h1>총 할일건수: {count} 건</h1>
    </div>
  )
}

export default Counter
