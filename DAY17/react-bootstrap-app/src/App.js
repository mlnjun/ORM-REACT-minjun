import React, { useReducer, createContext, useEffect } from 'react'

// bootstrap css파일 직접 참조하기
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// bootstrap css Sass(SCSS) 파일을 직접 참조하고 css번들링을 통해 부트스트랩.css파일 생성하서 사용하기
// React프로젝트에서 ~.scss파일을 참조한 경우 반드시 번들링 SW를 통해서 CSS번들링과정을 거친 후에샤 CSS사용가능함
// yarn add node-sass > 설치하면 리액트 파일내 ~.scss파일이 node-sass에 의해 자동 번들링(웹팩)되어 순수 css로 변환됨
import '../node_modules/bootstrap/scss/bootstrap.scss'

// 라우팅을 위한 react-router-dom 패키지의 BrowserRouter, Routes, Route 참조하기
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// React.lazy()를 사용하지 않고 직접 컴포넌트 참조하여 라우팅 처리하기 - 비권장 > 컴포넌트가 많지 않을 때 사용

import GNB from './components/GNB'
import Footer from './components/Footer'
// import Login from './pages/Login'
// import Register from './pages/Register'
import Main from './pages/Main'

import ArticleList from './pages/ArticleList'
import ArticleRegist from './pages/ArticleRegist'
import ArticleDetail from './pages/ArticleDetail'

import Article from './pages/Article'
import Articles from './pages/Articles'
import Login from './pages/Login'
import Register from './pages/Register'
import ArticleDe from './pages/ArticleDe'

import articleListReducer from './redux/articleListReducer'



export const ArticleContext = createContext(null)

function ArticleProvider({ children }) {
  const [articleList, dispatchArticleList] = useReducer(articleListReducer, [
    {
      id: 1,
      title: '제목1',
      contents: '내용1',
      regUser: '작성자1',
    },
    {
      id: 2,
      title: '제목22',
      contents: '내용22',
      regUser: '작성자22',
    },
    {
      id: 3,
      title: '제목33',
      contents: '내용33',
      regUser: '작성자33',
    },
  ])

  return <ArticleContext.Provider value={{ articleList, dispatchArticleList }}>{children}</ArticleContext.Provider>
}

function App() {
  return (
    <div>
      <ArticleProvider>
        <Router>
          <GNB></GNB>
          <div className="App">
            <div className="wrapper">
              <Routes>
                <Route path="/" Component={Main}></Route>
                <Route path="/article/list" Component={ArticleList}></Route>
                <Route path="/article/regist" Component={ArticleRegist}></Route>
                {/* <Route path="/article/:aid" Component={ArticleDetail}></Route> */}

                <Route path="/articles" Component={Articles}></Route>
                <Route path="/article" Component={Article}></Route>
                <Route path="/login" Component={Login}></Route>
                <Route path="/register" Component={Register}></Route>
                <Route path="/article/:aid" Component={ArticleDe}></Route>

              </Routes>
            </div>
          </div>
          <Footer></Footer>
        </Router>
      </ArticleProvider>
    </div>
  )
}

export default App
