import logo from './logo.svg'
import './App.css'

import React, { Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'

// 컴포넌트 참조하기
// import Counter from './components/Counter'
// import TodoList from './components/TodoList'

import GNB from './components/GNB'

const LoginPage = React.lazy(() => import('./pages/Login'))
const EntryPage = React.lazy(() => import('./pages/Register'))
const ProfilePage = React.lazy(() => import('./pages/Profile'))
const Profile2Page = React.lazy(() => import('./pages/Profile2'))
const MainPage = React.lazy(() => import('./pages/Main'))
const Login2Page = React.lazy(() => import('./pages/Login1'))
const Login3Page = React.lazy(() => import('./pages/Login3'))

function App() {
  return (
    <div className="App">
      {/* <Counter />
      <hr />
      <TodoList /> */}
      <GNB />
      {/* 로딩시 대체제 UI를 보여주는 것 */}
      <Suspense fallback={<div>로딩중...</div>}>
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route path="/login2" Component={Login2Page} />
          <Route path="/login3" Component={Login3Page} />
          <Route path="/entry" Component={EntryPage} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="/profile2" Component={Profile2Page} />
          <Route path="/" Component={MainPage} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
