import React, { useState } from 'react'

const ProductManager = () => {
  // 단일 상품정보 데이터 구조 정의 및 초기화
  const [product, setProduct] = useState({
    productName: '',
    price: 0,
    stock: 0,
    manufacturer: '',
  })

  // 상품목록 데이터 구조 정의 및 초기화
  const [productList, setProductList] = useState([])

  // 제품정보 입력처리 이벤트 핸들러
  const handleProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  // 저장버튼 클릭 이벤트 핸들러 함수
  const handleSave = () => {
    // 기존 상품 배열 목록에 등록한려는 단일 상품 객체의 복사본을 만들어 추가해준다.
    setProductList([...productList, { ...product }])
    handleInit()
  }


  // 초기화 버튼 클릭 이벤트 핸들러
  const handleInit = () => {
    setProduct({
      productName: '',
      price: 0,
      stock: 0,
      manufacturer: '',
    })
  }

  // 단일 상품정보 선택시 상단 폼에 선택정보 표시하기
  const handleSelect = (pro) => {
    // 배열에서 선택한 단일 상품 정보로 폼에 바인딩된 단일삼품정보로 변경 처리한다.
    setProduct(pro)
  }

  // 배열 선택 상품정보 삭제처리하고 재 바인딩하기
  const handleDelete = (pro) => {
    // 배열데이터에서 특정조건에 해당하는 데이터 복사본 목록을 조회할 때는 filtter() 메소드 사용
    // 배열안에 제품명이 삭제하려는 제품명과 다른것으로 조회하면 결국 삭제하려는 아이템만 빼고모두 조회하는 결과물이 만들어진다.
    const filterdProductList = productList.filter((p) => p.productName !== pro.productName)

    setProductList(filterdProductList)
  }

  // 상품목록 생성 함수 정의
  const productUIList = productList.map((pro, i) => (
    // ui요소에 반복적으로 map을 이용해 바인딩하는 경우 UI요소에 key속성을 유일값으로 바인딩해줘야 한다.
    <tr key={i}>
      <td>{pro.productName}</td>
      <td>{pro.price}</td>
      <td>{pro.stock}</td>
      <td>{pro.manufacturer}</td>
      <td>
        <button onClick={() => handleSelect(pro)}>선택</button>
        <button onClick={() => handleDelete(pro)}>삭제</button>
      </td>
    </tr>
  ))

  return (
    <div>
      <h1>제품정보 관리화면</h1>

      제품명: <input type="text" name="productName" value={product.productName} onChange={handleProduct} />
      <br />
      가격: <input type="text" name="price" value={product.price} onChange={handleProduct} />
      <br />
      재고: <input type="text" name="stock" value={product.stock} onChange={handleProduct} />
      <br />
      제조사: <input type="text" name="manufacturer" value={product.manufacturer} onChange={handleProduct} />
      <br />
      <hr />
      <button onClick={handleSave}>저장</button>
      <button onClick={handleInit}>초기화</button>

      <hr />
      <table>
        <thead>
          <tr>
            <th>제품명</th>
            <th>가격</th>
            <th>재고량</th>
            <th>제조사</th>
            <th>선택/삭제</th>
          </tr>
        </thead>
        <tbody>{productUIList}</tbody>
      </table>
    </div>
  )
}

export default ProductManager
