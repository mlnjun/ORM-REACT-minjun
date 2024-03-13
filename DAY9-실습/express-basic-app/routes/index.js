var express = require('express')
var router = express.Router()

var db = require('../models/index')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('public/index.html')
})

// 모든 상품 불러오기
router.post('/product', async (req, res, next) => {
  let productsList = await db.Product.findAll()

  res.send(productsList)
})

// 상품 추가
router.post('/product/add', async (req, res, next) => {
  let product = req.body

  await db.Product.create(product)

  let productsList = await db.Product.findAll()

  res.send(productsList)
})

// 단일 상품 삭제
router.delete('/product/:id', async (req, res, next) => {
  let id = req.params.id

  await db.Product.destroy({ where: { id: id } })

  let productsList = await db.Product.findAll()

  res.send(productsList)
})

module.exports = router
