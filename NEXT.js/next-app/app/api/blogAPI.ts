import useSWR, { mutate } from 'swr'

// get타입의 기본 데이터 조회 전용 fetch함수 정의
const getFetcher = (url: string) => fetch(url).then((res) => res.json())

// 백엔드 API 호출하고 SWR훅으로 값을 반환해주는 전용 개발자 훅함수 정의하기
// SWR기반 데이터 통신 전용 훅함수 정의
const useBlogDetail = (blogId: string) => {
  const { data, error, isLoading } = useSWR<any>(`http://localhost:3005/api/articles/${blogId}`, getFetcher)

  return {
    data:data,
    error:error,
    isLoading
  }
}


export default useBlogDetail