import React from 'react'

const functionChild = (props) => {
  return (
    <div>
      <h1>회사소개</h1>
      <h3>{props.children}</h3>
      회사명 : {props.companyName} <br />
      전화번호 : {props.telephone} <br />
      주소 : {props.address} <br />
      샘플데이터 : {props.sampleData}<br />
    </div>
  )
}

export default functionChild
