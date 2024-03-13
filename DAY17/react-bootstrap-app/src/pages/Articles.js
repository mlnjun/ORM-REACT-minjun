import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// 백엔드 RESTful 통신을 위한 axios 참조하기
import axios, { Axios } from 'axios'

const Articles = () => {
  // navigate훅 생성하기
  const navigate = useNavigate()

  // 게시글 목록 데이터 상태 구조 정의하기
  const [articleList, setArticleList] = useState([])

  // 화면 최초 렌더링시에 백엔드 게시글 목록 조회/바인딩하기
  useEffect(() => {
    console.log('최초 화면렌더링시에 호출됩니다.')

    // 콜백방식 axios 비동기 방식 데이터 호출 처리방법 1
    // 콜백방식으로 axios를 구현하는 경우 가독성이 떨어지고 후행로직이 있는경우 Callback지옥이 재현된다.
    // axios 비동기 통신 콜백지옥 문제를 해결하기 위해서는 주로 promise 방식보다는 async, await방식을 통해 구현된다.
    // axios
    //   .get('http://localhost:3005/api/articles')
    //   .then((res) => {
    //     console.log('백엔드에서 전달된 데이터 목록 : ', res)

    //     // 정상적인 API호출 > 백엔드 게시글 목록 배열을 해당 상태값으로 변경해준다.
    //     if (res.data.code === '200') {
    //       // 백엔드 데이터로 데이터 바인딩 처리하기
    //       setArticleList(res.data.data)
    //     } else {
    //       console.log('백엔드 호출 에러발생', res.data.result)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('백엔드 호출 에러발생', err)
    //   })

    // 비동기 함수 호출하기
    getArticles()
  }, [])

  // 비동기 함수 구현
  async function getArticles() {
    // async/await 방식으로 구현하는 경우 따로 예외처리를 적용해야한다.
    try {
      const res = await axios.get('http://localhost:3005/api/articles')
      console.log('백엔드에서 전달된 데이터 값 확인하기', res)
      setArticleList(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  // 익명함수 구현
  const getArticles2 = async () => {
    // async/await 방식으로 구현하는 경우 따로 예외처리를 적용해야한다.
    try {
      const res = await axios.get('http://localhost:3005/api/articles')
      console.log('백엔드에서 전달된 데이터 값 확인하기', res)
      setArticleList(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="article-wrapper">
      <div className="row mb-2">
        <div className="col text-start">
          <h4>게시글 목록</h4>
        </div>
        <div className="col">
          {/* <button className="btn btn-primary float-end" onClick={() => navigate('/article')}>
            글작성
          </button> */}
          <Link className="btn btn-primary float-end" to={'/article'}>
            글작성
          </Link>
        </div>
      </div>

      <div className="articles">
        <table className="table articles">
          <thead>
            <tr>
              <th scope="col">글순번</th>
              <th scope="col">제목</th>
              <th scope="col">조회수</th>
              <th scope="col">글쓴이</th>
              <th scope="col">등록일시</th>
            </tr>
          </thead>
          <tbody>
            {articleList.map((item, index) => (
              <tr key={item.article_id}>
                <th scope="row">{item.article_id}</th>
                <td>
                  <Link to={{ pathname: '/article/' + item.article_id }}>{item.title}</Link>
                </td>
                <td>{item.view_count}</td>
                <td>{item.reg_member_id}</td>
                <td>{item.reg_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Articles
