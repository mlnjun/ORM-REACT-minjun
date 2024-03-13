import React, { Component } from 'react'

// 클래스형 컴포넌트는 기본적으로 react 패키지의 Component라는 클래스를 상속받아서 구현한다.
// JavaScript에서 특정 클래스를 상속 받을 때는 extends 예약어를 사용해 상속받아 새로운 클래스를 정의합니다.
class ClassChild extends Component {
  // 코딩 가능 영역
  render() {
    // 코딩 가능영역

    return (
      <div>
        <h1>회사소개</h1>
        <h3>{this.props.children}</h3>
        부서명 : {this.props.deptName} <br />
        부서 역할 : {this.props.deptRole} <br />
        직원 수 : {this.props.employee} <br />
        샘플데이터 : {this.props.sampleData} <br />
      </div>
    )
  }
}

export default ClassChild
