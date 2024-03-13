import React, { useState } from 'react'
import './App.css'

// 자식 컴포넌트 참조하기
import FChild from './FunctionChild'
import CChild from './ClassChild'

import MyProfile from './Profile'

// 상태관리기법 함수형, 클래스형
import CounterFunction from './CounterFunctionComponent'
import CounterClass from './CounterClassComponent'

// 함수형 컴포넌트 생성하기
// 리액트 UI 컴포넌트는 반환값으로 JSX UI요소정보를 반환하여 최종 웹브라우저에 UI를 표현합니다
// JSX UI요소를 제하기 위해 함수내에 기능구현 영역에서 필요한 데이터와 이벤트를 처리합니다.
function App() {
  // 기능구현코드
  // 이벤트 기능 구현
  // 해당 컴포넌트의 STATE(로컬 데이터) 값과 JSX영역내 UI요소간 데이터 바인딩을 통해
  // 데이터 바인딩 기법으로 UI와 데이터를 편리하게 관리한다.

  // 샘플용 로컬 문자열 테스트 데이터(스테이트) 정의 및 초기값 할당하기
  const [sample, setSample] = useState('샘플데이터')

  const [user, setUser] = useState({
    userid: 'kmj11',
    name: '이름',
    email: '222@gmail.com',
    telephone: '010-3333-3333',
    address: '주소',
  })

  return (
    <div style={{ background: '#666', color: 'white' }}>
      <h1>메인 컴포넌트 {sample}</h1>

      {/* 각종 UI컴포넌트의 반환 결과값이 결국 JSX요소들이기 때문에 참조한 UI는 결국 부모 컴포넌트에 JSX영역에서 사용된다. */}
      {/* 함수형 자식 컴포넌트 결과물(JSX요소) 표시하기 */}
      <FChild companyName="네이버" telephone="010-1111-1111" address="서울시" sampleData={sample}>
        우리회사소개
      </FChild>

      {/* 클래스형 자식 컴포넌트 결과물(JSX요소) 표시하기 */}
      <CChild deptName="개발1팀" deptRole="협업툴솔루션개발" employee={10} sampleData={sample}>
        개발팀 소개
      </CChild>

      <MyProfile userid="kmj" name="고민준" email="1111@gmail.com" telephone="010-0000-0000" age={25}>
        내 소개 페이지
      </MyProfile>

      <MyProfile userid={user.userid} name={user.name} email={user.email} telephone={user.telephone} age={25}>
        스테이트 기반 내 소개 페이지
      </MyProfile>

      <CounterFunction></CounterFunction>
      <CounterClass></CounterClass>
    </div>
  )
}

export default App
