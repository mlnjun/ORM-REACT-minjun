import React, { useContext } from 'react'

import { ArticleContext } from '../App'
import { Link } from 'react-router-dom'

const ArticleList = () => {
  const { articleList } = useContext(ArticleContext)

  return (
    <div className="container text-center">
      <div className="card bg-light">
        <table className="table" style={{ marginBottom: '0' }}>
          <thead>
            <tr className="table-secondary">
              <th scope="col">#</th>
              <th scope="col">제목</th>
              <th scope="col">내용</th>
              <th scope="col">작성자</th>
            </tr>
          </thead>
          <tbody>
            {articleList.map((art, i) => (
              <tr key={i}>
                <th scope="row">
                  <Link to={`/article/detail/${art.id}`} style={{ textDecoration: 'none' }}>
                    {art.id}
                  </Link>
                </th>
                <td>{art.title}</td>
                <td>{art.contents}</td>
                <td>{art.regUser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ArticleList
