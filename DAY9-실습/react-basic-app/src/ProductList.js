import React, { useState } from 'react'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/'

const ProductList = () => {
  // 상품 정보 리스트 정의
  const [products, setProducts] = useState([])

  // 상품 정보 리스트 불러오기
  window.onload = function () {
    axios
      .post('/product')
      .then(function (res) {
        setProducts(res.data)
      })
      .catch(function (err) {
        console.error(err)
      })
  }

  // 상품 단일 정보 관리 상태값
  const [product, setProduct] = useState({
    id: 0,
    product_name: '',
    price: 0,
  })

  // 상품 단일 정보 데이터 핸들러
  const handleProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  // 상품 추가 핸들러
  const handleAddProd = () => {
    // setProducts([...products, { ...product, id: products.length + 1 }])

    // DB에 추가
    axios
      .post('/product/add', product)
      .then(function (res) {
        setProducts(res.data)
      })
      .catch(function (err) {
        console.error(err)
      })

    setProduct({
      id: 0,
      product_name: '',
      price: 0,
    })
  }

  // 상품 선택 핸들러
  const handleSelect = (pro) => {
    setProduct(pro)
  }

  // 상품 삭제 핸들러
  const handleDelete = (id) => {
    // const filteredProduct = products.filter((p, index) => index !== i)

    axios
      .delete(`/product/${id}`)
      .then(function (res) {
        setProducts(res.data)
      })
      .catch(function (err) {
        console.error(err)
      })
  }

  return (
    <div>
      <b>신규 제품 등록</b>
      제품명:{' '}
      <input
        type="text"
        name="product_name"
        placeholder="제품명"
        value={product.product_name}
        onChange={handleProduct}
      />
      가격: <input type="text" name="price" placeholder="가격" value={product.price} onChange={handleProduct} />
      <button onClick={handleAddProd}>저장</button>
      <hr />
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>제품 번호</th>
            <th>제품명</th>
            <th>가격</th>
            <th>선택</th>
            <th>삭제</th>
          </tr>
        </thead>

        <tbody>
          {/* 상품 리스트 */}
          {products.map((pro, i) => (
            <tr key={i}>
              <td>{pro.id}</td>
              <td>{pro.product_name}</td>
              <td>{pro.price}</td>
              <td>
                <button onClick={() => handleSelect(pro)}>선택</button>
              </td>
              <td>
                <button onClick={() => handleDelete(pro.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
