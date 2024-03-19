// "use client" : 해당 컴포넌트를 서버 컴포넌트가 아닌 클라이언트 컴포넌트로 생성하고 작동되게하고 

export default function BlogDetail(props: any) {

  // props의 값을 출력
  console.log("props => ", props)

  // 동적 라우팅 파라미터 값 추출하기 localhost:3000/blog/1 1값을 추출
  const articleId = props.params.blogId

  // QueryString으로 전달되는 키값 추출하기 localhost:3000/blog/1?category=10&flag-test
  const category = props.searchParams.category
  const flag = props.searchParams.flag

  return (
    <>
      단일 블로깅 상세 페이지
      <br />
      블로깅 게시글 고유번호: {articleId}
      <br />
      QueryString으로 전달되는 추가값 : 카테고리 - {category} 플래그 - {flag}
    </>
  )
}
