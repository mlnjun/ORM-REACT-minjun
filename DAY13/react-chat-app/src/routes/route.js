// 어떤 주소로 어떤 컴포넌트 호출할지 정하기

// 리액트 채팅앱의 모든 화면 컴포넌트의 라우팅 규칙을 정의
import React from 'react'
import { Navigate } from 'react-router-dom'

// 기정의된 페이지 컴포넌트를 참조한다.
// React.lazy() 화면컴포넌트를 동적으로 렌더링하기 위해 사용
// React.lazy(import(해당화면-페이지컴포넌트 지정))

// 사용자 인증 필요 컴포넌트
const StarterPage = React.lazy(() => import('../pages/starter/index'))
const Dashboard = React.lazy(() => import('../pages/Dashboard/index'))

// 사용자 인증 불필요 컴포넌트
const Login = React.lazy(() => import('../pages/Auth/Login'))
const Register = React.lazy(() => import('../pages/Auth/Register'))

// 인증이 필요한 라우팅 목록 및 라우팅 규칙 정의
const authProtectedRoutes = [
  { path: '/starter', component: <StarterPage /> },
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/', exact: true, component: <Navigate to="/dashboard" /> },
]

// 인증 불필요 라우팅 목록 및 라우팅 규칙 정의
const publicRoutes = [
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
]


export {authProtectedRoutes, publicRoutes}