// DeepCopy의 주요기법은 자바스크립트 Spread 연산자(Operator)에 대한 기초 사용법을 실습
// Spread연산자는 배열/객체의 복사/병합시 주로 사용한다.

// 1) 배열기반 Spread연산자 사용해보기
const numbersOne = [1, 2, 3]
const numbersTow = [4, 5, 6]

// 두개 배열을 spread연산자를 통해 병합하기
// spread연산자는 ...복사할배열변수 형식으로 복사본을 만든다.(별도의 메모리 주소와 공간에 할당)
const numbersCombined = [...numbersOne, ...numbersTow]

console.log('스프레드 연산자에 의해 병합된 신규배열:', numbersCombined)

// 특정 배열내 값의 나머지 값을 별도 변수로 할당하기
const numbers = [10, 11, 12, 13, 14, 15]
const [one, two, ...rest] = numbers

console.log('one:', one, 'two:', two, 'rest:', rest)

// 배열 데이터를 복사하기
const originNumbers = [1, 2, 3, 4, 5]
// const newNumbers = originNumbers;  // 원본데이터를 공유하는 Swallow Copy
const newNumbers = [...originNumbers] // 신규 데이터 배열을 만드는 Deep Copy

console.log('DeepCopy-Spread 연산자 배열 복사하기', newNumbers)

// 객체 기반에서의 DeepCopy 구현하기
const user = {
  id: 1,
  userName: '사용자',
  age: 20,
  address: {
    sido: 'ㅁㅁ도',
    detail: 'ㅁㅁ시',
  },
}

const user1 = user // Swallow Copy : 원본 주소 복사
user1.userName = 'kmj'

const user2 = { ...user } // Deep Copy : 분리된 복사본 생성/ 1Depth 까지만
user2.age = 30
user2.address.sido = 'ㅇㅇ시' // Deep Copy Spread연산자는  1Depth 속성까지만 딥카피가 되고 2Depth이상은 원본소스의 값을 공유함

console.log('user1', user1)
console.log('user2', user2)

console.log('user === user1', user === user1)
console.log('user1 === user2', user1 === user2)

// Deep Copy 사용시 기존 속성 값 변경 및 신규 속성 추가하기
const car = {
  brand: 'Ford',
  model: 'Mustang',
  color: 'red',
}

// spread연산자를 이용해 복사본을 만들고 기존의 속성값을 변경하거나 신규 속성을 추가하여 신규 객체를 생성할 수 있다.

const myCar = { ...car, brand: 'Kia', price: 5000 }

console.log('myCar:', myCar)

// 두개의 별도 다른 객체도 쉽게 병합이 가능하다.
const company = {
  companyName: 'Kia Auto',
  country: 'Korea',
  telephone: '82)02-111-1111',
}

const carInfo = { ...myCar, ...company }

console.log('carInfo:', carInfo)

// 2Depth 이상의 객체의 Deep Copy 구현하기
// 주문정보: {기본주문정보:원시타입, 주문상품목록:배열, 배송지정보:객체}
const order = {
  orderNo: 1000,
  orderName: '고민준',
  amount: 10000,
  products: [
    { pid: 1, productName: 'LG노트북' },
    { pid: 2, productName: 'LG마우스' },
  ],
  address: {
    zipCode: '11111',
    sido: 'ㅁㅁ도',
    detail: 'ㅁㅁ시',
  },
}

// 2Depth이상의 DeepCopy사용하기
// 2Depth이상의 속성의 값이 배열인 경우 > array.map() 메소드를 통해 배열안에 객체를 복사(DeepCopy)해서 배열 복사본을 새로 만들어서 할당한다.
// 2Depth이상의 속성의 값이 단일 객체인 경우는 오리지널 소스의 복사본(DeepCopy-Spread연산자)을 새로 만들고 속성의 값을 재할당한다.
const newOrder = {
  ...order,
  products: [
    ...order.products.map((p) => {
      // 배열내의 객체들의 DeepCopy
      // map을 통해서 배열의 복사본(DeepCopy)만 만들어지고 배열내의 객체들은 추가로 DeepCopy
      return { ...p }
      // return p;  // Swallow Copy
    }),
  ],
  address: { ...order.address },
}

// 2Depth이상 속성의 값을 바꾼 후 원본과 비교
newOrder.products[0].productName = '삼성노트북'
newOrder.address.sido = 'ㅇㅇ시'

console.log('order', order)
console.log('newOrder', newOrder)
