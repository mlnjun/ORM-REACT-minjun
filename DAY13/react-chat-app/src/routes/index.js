// route를 호출해서 사용하는 최상위 컴포넌트
// 인증, 비인증에 따른 라우팅 기능 구현

// 기정의된 라우팅 주소 규칙에 따라 페이지를 렌더링 할 때
// 해당 콘텐츠 페이지를 감싸주는 인증에 따른 레이아웃 컴포넌트를 라우팅 페이지 컴포넌트와 통합해서 최종 브라우저에 렌더링하는 역할

// Suspense react v.18 부터 제공됨
// 화면 컴포넌트가 렌더링 작업이 끝날때까지 잠시 중단시키고 다른 컴포넌트를 먼저 렌더링하게하는 기능제공
// 데이터의 로딩/바인딩 지연시 특정 UI요소를 대체해서 보여주고 렌더링이 완료되면 사라짐
import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { authProtectedRoutes, publicRoutes } from './route'

import NonAuthLayout from '../layouts/NonAuthLayout'

import AuthLayout from '../layouts/AuthLayout'

// 인증 필수 주소 > 로그인 체크 기능
const AuthProtected = (props) => {
  // 로그인한 사용자 JWT토큰이 없거나 현제 호출하는 페이지가 인증에 의해 보호되는 페이지인경우
  if (props.isAuthProtected && !localStorage.getItem('authUser')) {
    return <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
  }
}

// 메인 라우팅 컴포넌트 구현
const MainRoutes = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div>로딩중...</div>}>
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              layout={NonAuthLayout}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              isAuthProtected={false}
            />
          ))}
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              layout={AuthLayout}
              element={
                <AuthProtected isAuthProtected={true}>
                  <AuthLayout>{route.component}</AuthLayout>
                </AuthProtected>
              }
              key={idx}
              isAuthProtected={true}
            />
          ))}
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}

export default MainRoutes
