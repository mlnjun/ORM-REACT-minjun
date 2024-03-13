// 원시타입 변수 선언과 할당의 의미를 알아보자

let score

score = 80
score = 90

console.log('스코어값: ', score)

// 원시타입 score값을 copy변수에 복사 할당한다.
let copy = score

console.log('copy-score1', copy, score)

copy = 100

// 복사한 원시타입의 값을 변경해도 원본의 값은 변경되지 않는다. - 실제 저장되는 메모리 공간이 다르다.
console.log('copy-score2', copy, score)

// === 값을 비교하는데 type까지 같이 비교, 정확하게는 동일한 메모리 주소를 바라보는지를 체크
console.log('변수의 메모리주소가 같은지 여부체크', copy === score)

// 참조타입의 불변성
// 기본적으로 참조타입은 불변성을 지원하지 않는다. = 동일한 메모리공간을 참조/재사용한다.
// 참조타입은 값을 변경해서 새로운 메모리 공간을 할당하지 않고 기존 할당된 메모리공간(메모리주소)에 값을 업데이트한다.

var user1 // 변수 선언 : undefinde 할당

// 참조타입 값 할당
user1 = {
  id: 1,
  name: 'kmj',
  age: 25,
  address: { sido: 'ㅁㅁ도', detail: 'ㅁㅁ시 ㅁㅁ구' },
}

console.log('참조타입-객체정의하고 값할당하기', user1)

// 참조타입 값 변경
user1.name = '고민준'

console.log('참조타입-객체정의하고 값할당하기', user1)

// 참조타입 복사
// 참조타입을 그냥 복사하면 복사한 원본의 주소를 참조하고 같은 공간의 데이터를 공유하게된다.
// 공유된 공간의 값을 복사하는데 이를 얕은카피(Shallow Copy)라고 한다.
var user2 = user1

user2.name = '가브리엘'

console.log('user1', user1)
console.log('user2', user2)

console.log('user1 === user2', user1 === user2)
