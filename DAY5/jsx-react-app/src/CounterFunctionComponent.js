import React, { useState } from 'react'

const CounterFunctionComponent = () => {
  // 자동 증감되는 숫자 저장용 스태이트값 정의 및 초기값 할당
  const [count, setCount] = useState(100)

  // 사용자명 원시타입 문자열 데이터 정의 및 초기값 할당
  const [userName, setUserName] = useState('고민준')

  // 상품정보 배열 데이터 정의 및 초기값 할당
  const [goods, setGoods] = useState([
    { id: 1, productName: '제품1', price: 5000 },
    { id: 2, productName: '제품2', price: 10000 },
  ])

  // 로그인 여부 데이터 저장 불린형 값 정의 및 초기값 할당
  const [isLoggined, setIsLoggined] = useState(true)

  // 단일 사용자 정보를 데이터의 구조를 정의하고 초기값 할당하기
  const [user, setUser] = useState({ userId: 'kmj', userName: '고민준' })

  // 증가 버튼 클릭시 호출되는 이벤트 처리함수
  const handleIncrease = () => {
    console.log("증가 버튼이 클릭되었습니다.")
    setCount(count + 1);
    // setCount((prevCount)=> prevCount+1)
    // 반드시 count값을 변경하려면 해당 세터함수인 setCount()를 통해서 변경해야한다.
  }

  // 감소버튼 클릭시 호출되는 이벤트 처리 핸들러 함수 정의
  const handleDecrease = () => {
    console.log("감소 버튼이 클릭되었습니다.")
    setCount(count - 1);
  }

  return (
    <div>
      <h1>카운터 상태값 표시: {count}</h1>
      <button onClick={handleIncrease}>+1</button>
      <button onClick={handleDecrease}>-1</button>
    </div>
  )
}

export default CounterFunctionComponent
