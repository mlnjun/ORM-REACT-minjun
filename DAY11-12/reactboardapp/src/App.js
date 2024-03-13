import React, { useState } from 'react'

import BoardTemplate from './BoardTemplate'
import ArticleManager from './ArticleManager'
import ArticleList from './ArticleList'

function App() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: '글제목1',
      contents: '글내용1',
      regUser: '작성자1',
    },
    {
      id: 2,
      title: '글제목2',
      contents: '글내용2',
      regUser: '작성자2',
    },
    {
      id: 3,
      title: '글제목3',
      contents: '글내용3',
      regUser: '작성자3',
    },
  ])

  const [article, setArticle] = useState({
    id: 0,
    title: '',
    contents: '',
    regUser: '',
  })

  // 등록 수정 삭제 함수
  // id채번
  const [articleId, setArticleId] = useState(articles.length + 1)

  // 등록
  const handleUpload = (art) => {
    setArticles([...articles, { id: articleId, title: art.title, contents: art.contents, regUser: art.regUser }])
    setArticleId(articleId + 1)

    setArticle({
      id: 0,
      title: '',
      contents: '',
      regUser: '',
    })
  }

  // 수정
  const articleUpdate = (art) => {
    const updateArticle = articles.map((a) => (a = a.id === art.id ? art : a))
    setArticles(updateArticle)
  }

  // 삭제
  const articleDelete = (id) => {
    setArticles(articles.filter((a) => a.id !== id))
  }

  // 선택
  const handleSelect = (art) => {
    setArticle({ art })
  }

  return (
    <div className="App" style={{ margin: '0 auto', width: '60%', textAlign: 'center' }}>
      <BoardTemplate>
        <ArticleManager
          article={article}
          setArticle={setArticle}
          setArticles={setArticles}
          handleUpload={handleUpload}
          articleUpdate={articleUpdate}
          articleDelete={articleDelete}
        ></ArticleManager>
        <ArticleList articles={articles} handleSelect={handleSelect}></ArticleList>
      </BoardTemplate>
    </div>
  )
}

export default App
