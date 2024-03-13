import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArticleContext } from '../App'

const ArticleDetail = () => {
  const { aid } = useParams()

  const navigate = useNavigate()

  const { articleList, dispatchArticleList } = useContext(ArticleContext)

  const [article, setArticle] = useState({
    title: '',
    contents: '',
    regUser: '',
  })

  useEffect(() => {
    setArticle(articleList.find((art) => art.id === parseInt(aid)))
  }, [])

  const handleArticle = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  }

  const handleUpload = () => {
    dispatchArticleList({ type: 'UPLOAD', payload: article })

    navigate('/article/list')
  }

  const handleDelete = () => {
    dispatchArticleList({ type: 'DELETE', payload: article.id })

    navigate('/article/list')
  }

  return (
    <div className="container text-start" style={{ border: 'black 1px solid', borderRadius: '10px' }}>
      <div className="row">
        <div className="col">
          <h4 className="text-center">게시글 수정</h4>
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
            <button className="btn btn-success" onClick={handleUpload}>
              수정
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              삭제
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

export default ArticleDetail
