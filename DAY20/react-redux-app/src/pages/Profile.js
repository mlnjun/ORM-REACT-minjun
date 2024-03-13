import React, { useEffect, useState } from 'react'

// 전역데이터 공간에서 로그인한 사용자 정보 가져오기 위한 useSelector 훅 참조하기
import { useSelector } from 'react-redux'

import axios from 'axios'

const Profile = () => {
  // 전역데이터 공간에 로그인한 사용자 정보 가져오기
  const token = useSelector((state) => state.Auth.token)

  const loginUser = useSelector((state) => state.Auth.loginUser)

  // DB에서 가져온 사용자 데이터
  const [user, setUser] = useState({})

  // 최초 컴포넌트 렌더링시에만 백엔드에서 로그인 사용자 정보 조회/바인딩하기
  useEffect(() => {
    axios
      .get('http://localhost:3005/api/member/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('로그인 사용자 정보 출력', res.data.data)
        setUser(res.data.data)
      })
      .catch((err) => {
        console.log('백엔드 호출 에러')
      })
  }, [])

  return (
    <div>
      <h1>로그인 한 사용자의 프로필정보</h1>
      메일주소: {loginUser.email}
      <br />
      이름 : {loginUser.name}
      <br />
      프로필 이미지 : {loginUser.profile_img_path}
      <br />
      <h4>토큰으로 백엔드에서 불러온 프로필정보</h4>
      메일주소: {user.email}
      <br />
      이름 : {user.name}
      <br />
      프로필 이미지 : {user.profile_img_path}
      <br />
    </div>
  )
}

export default Profile
