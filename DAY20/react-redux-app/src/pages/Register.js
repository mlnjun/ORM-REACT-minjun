import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
  })

  const navigate = useNavigate()

  // 회원정보 데이터 바인딩 처리함수
  const onChangeEntry = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // 회원가입 이벤트 처리 함수
  const onEntry = (e) => {
    const entryUser = {
      email: user.email,
      password: user.password,
      name: user.name,
    }

    // 회원가입 로직
    axios
      .post('http://localhost:3005/api/member/entry', entryUser)
      .then((res) => {
        console.log('회원가입 결과 값 : ', res.data)
        navigate('/login')
      })
      .catch((err) => {
        console.log('백엔드 호출 에러발생: ', err)
      })

    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={onEntry}>
        메일주소: <input name="email" value={user.email} onChange={onChangeEntry} />
        <br />
        암호 : <input type="password" name="password" value={user.password} onChange={onChangeEntry} />
        <br />
        이름 : <input name="name" value={user.name} onChange={onChangeEntry} />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default Register
