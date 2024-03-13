import React from 'react'

import { Link } from 'react-router-dom'

const GNB = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          메인
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                로그인
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                회원가입
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/articles">
                게시글
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default GNB
