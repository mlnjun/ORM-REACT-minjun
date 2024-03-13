import React from 'react'

const ArticleManager = ({ article, setArticle, handleUpload, articleUpdate, articleDelete }) => {
  // 게시글 정보


  // 단일 게시글 정보 핸들러
  const handleArticle = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  }

  // 초기화
  const handleInit = () => {
    setArticle({
      id: 0,
      title: '',
      contents: '',
      regUser: '',
    })
  }

  // 수정
  const handleUpdate = () => {
    articleUpdate(article)
  }


  return (
    <div>
      id : {article.id === 0 ? '' : article.id}
      <br />
      제목 : <input name="title" placeholder="제목" value={article.title} onChange={handleArticle} />
      <br />
      내용 : <textarea name="contents" placeholder="내용" value={article.contents} onChange={handleArticle}></textarea>
      <br />
      등록자 : <input name="regUser" placeholder="등록자" value={article.regUser} onChange={handleArticle} />
      <br />
      <button onClick={() => handleUpload(article)}>등록</button>
      <button onClick={handleUpdate}>수정</button>
      <button onClick={() => articleDelete(article.id)}>삭제</button>
      <button onClick={handleInit}>초기화</button>
    </div>
  )
}

export default ArticleManager
