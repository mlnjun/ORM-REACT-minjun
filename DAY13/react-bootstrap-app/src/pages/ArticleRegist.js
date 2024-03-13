import React, { useState, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArticleContext } from '../App'

const ArticleRegist = () => {
  // Context를 통해 상태, dispatch 함수 받아오기
  const { articleList, dispatchArticleList } = useContext(ArticleContext)

  // 단일 게시글 객체 상태 생성
  const [article, setArticle] = useState({
    title: '',
    contents: '',
    regUser: '',
  })

  const handleArticle = useCallback((e) => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  })

  // useNavigate를 호출할 변수 생성
  const navigate = useNavigate()

  const handleSave = useCallback(() => {
    // 등록 로직
    dispatchArticleList({ type: 'UPLOAD', payload: article })

    navigate('/article/list')
  }, [article, dispatchArticleList, navigate])

  return (
    <div className="container text-start" style={{ border: 'black 1px solid', borderRadius: '10px' }}>
      <div className="row">
        <div className="col">
          <h4 className="text-center">게시글 등록</h4>
          <label for="articleTitle" class="form-label">
            제목
          </label>
          <input
            className="form-control"
            id="articleTitle"
            name="title"
            value={article.title}
            onChange={handleArticle}
          ></input>
          <br />
          <label for="articleContents" class="form-label">
            내용
          </label>
          <textarea
            className="form-control"
            id="articleContents"
            name="contents"
            value={article.contents}
            onChange={handleArticle}
          ></textarea>
          <br />
          <label for="articleRegUser" class="form-label">
            작성자
          </label>
          <input
            className="form-control"
            id="articleRegUser"
            name="regUser"
            value={article.regUser}
            onChange={handleArticle}
          ></input>
          <br />
          <div className="text-center">
            <button className="btn btn-success" onClick={handleSave}>
              저장
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate('/')
              }}
            >
              메인 이동
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleRegist
