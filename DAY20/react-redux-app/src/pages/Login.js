import React, { useState } from 'react'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { userLogin } from '../redux/actions'

const Login = () => {
  const globalDispatch = useDispatch()

  const navigate = useNavigate()

  const [login, setLogin] = useState({
    email: '',
    password: '',
  })

  const onChaingeLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  // 로그인 처리 이벤트 처리함수
  const onLogin = (e) => {
    // axios로 백엔드 로그인 RESTful API 호출하기
    axios
      .post('http://localhost:3005/api/member/login', login)
      .then((res) => {
        console.log('로그인 결과 값 확인 : ', res.data)

        // 웹브라우저 로컬스토리지에 저장하는 방법
        localStorage.setItem('userToken', res.data.data.token)

        // 리덕스 전역데이터 저장소(store)에 토큰/로그인 사용자 정보 저장
        if (res.data.code == '200') {
          globalDispatch(userLogin(res.data.data.token, res.data.data.loginUser))
          // axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token
          navigate('/profile')
        }
      })
      .catch((err) => {
        console.log('백엔드 호출 에러발생', err)
      })

    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={onLogin}>
        메일주소: <input name="email" value={login.email} onChange={onChaingeLogin} />
        <br />
        암호 : <input type="password" name="password" value={login.password} onChange={onChaingeLogin} /> <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}

export default Login
