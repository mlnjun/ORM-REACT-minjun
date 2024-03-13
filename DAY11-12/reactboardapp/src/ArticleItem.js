import React from 'react'

const ArticleItem = ({ articles, handleSelect }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>글번호</th>
          <th>제목</th>
          <th>내용</th>
          <th>등록자</th>
          <th>선택</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((a) => (
          <tr>
            <td>{a.id}</td>
            <td>{a.title}</td>
            <td>{a.contents}</td>
            <td>{a.regUser}</td>
            <button onClick={() => handleSelect(a)}>선택</button>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ArticleItem
