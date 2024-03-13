// 제너레이터 함수 정의하기
// 제너레이터 함수는 function* () { yield;(첫번쩨 중단시키는 명령어) yield;(두번재 중단)}
// 제너레이터 함수의 목정은 함수내의 로직을 순차적으로 진행시키고
// 진행되는 순서에 따른 반환값의 다양하게 반환하려 할 때
const gen = function* () {
  console.log(1)
  yield

  console.log(2)
  yield

  console.log(3)
  yield
}

// 제너레이터 함수를 실행시킵니다.
const display = gen()

// 제너레이터 함수에서 제공되는 next() 함수는 yield를 기준으로 로직/프로세스를 순차적으로 실행시키는 명령어
display.next() // 1

display.next() // 2

display.next() // 3

display.next() // 제너레이터 함수 끝나서 실행 x

// 루프되는 로직 구현할 때 좋아보임
// 무한 반복 제너레이터 함수fff
let i = 0
const gen2 = function* () {
  while (true) {
    // yield 전에 로직처리 후 반환값은 yield에 표시함s
    // yield 반환값 지정
    yield i++
  }
}

const display2 = gen2()

display2.next()
console.log('현재 전역변수 값 : ', i)

display2.next()
console.log('현재 전역변수 값 : ', i)

display2.next()
console.log('현재 전역변수 값 : ', i)

display2.next()
console.log('현재 전역변수 값 : ', i)

display2.next()
console.log('현재 전역변수 값 : ', i)
