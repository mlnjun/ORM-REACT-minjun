import React from 'react'

// connect함수를 이용해 전역데이터를 불러옵시다.
import { connect } from 'react-redux'

const Profile2 = (props) => {
  return (
    <div>
      <h1>로그인 한 사용자의 프로필정보</h1>
      메일주소: {props.loginUser.email}
      <br />
      이름 : {props.loginUser.name}
      <br />
      프로필 이미지 경로 : {props.loginUser.profile_img_path}
      <br />
    </div>
  )
}

const mapStateToProps = (state) => {
  // reducer 함수 Auth
  const { token, loginUser } = state.Auth
  return { token, loginUser }
}

export default connect(mapStateToProps)(Profile2)
