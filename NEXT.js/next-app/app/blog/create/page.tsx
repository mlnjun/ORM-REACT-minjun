'use client'

import React, { useState, useEffect } from 'react'

// 게시글 등록이후 페이지 이동을 위한 navigate 참조하기
import { useRouter } from 'next/navigation'

// 단일 게시글 정보 제너릭 타입 정의(개발자 정의 데이터 객체
// 기본적인 개발자정의 타입은 선언된 타입은 모두 사용하게 제약을 한다.
// 타입속성명? > 선택적속성(Optional Property)을 선언하는 것으로
// 선택적 속성은 선언된 타입을 사용할 때 해당 선택적 옵션을 사용해도 되고 안해도 될수 있게하는기능을 지원

// 타입선언자로 타입을 정의하는 방법
type Article = {
  article_id?: number
  boeard_type_code?: number
  article_type_code?: number
  title: string
  contents: string | null // 두가지 모두 지원
  is_display_code: number
}

// interface > I 앞에 붙여서 구분
// 인터페이스 방식으로 타입을 정의하는 방법
interface IArticle {
  article_id?: number
  boeard_type_code?: number
  article_type_code?: number
  title: string
  contents: string | null // 두가지 모두 지원
  is_display_code: number
}

// article_id: number
// boeard_type_code: number
// article_type_code: number
// title: string
// contents: string | null // 두가지 모두 지원
// view_count: number
// ip_adress: string
// is_display_code: number
// reg_date: string // Date > json문자열 > string
// reg_member_id: number
// edit_date?: string | null
// edit_member_id?: number | null

export default function BlogCreate() {
  // navigate 객체
  const router = useRouter()

  // 타입스크립트 방식으로 useState 정의하기
  const [article, setArticle] = useState<IArticle>({
    title: '',
    contents: '',
    is_display_code: 1,
  })

  // const [article, setArticle] = useState({
  //   title: '',
  //   contents: '',
  //   is_display_code: 1,
  // })

  // 함수 파라미터에 변수명?는 해당 변수값이 전달될수도 안될수도 있는경우를
  const onBlogChange = (e: any, test?: any) => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  }

  const onBlogSubmit = (e: any) => {
    e.preventDefault()

    // axios or fetch
    const fetchData = async () => {
      const response = await fetch('http://localhost:3005/api/articles', {
        method: 'POST',
        headers: {
          //Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      console.log('처리결과 데이터:', result)

      if (result.code == '200') {
        // 특정 URL페이지로 이동시키기
        router.push('/blog/list')
      }
    }

    fetchData().catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e)
    })
  }

  return (
    <div>
      <h3>게시글 작성</h3>
      <form onSubmit={onBlogSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">게시글 작성</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">게시글을 작성해주세요.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  글제목
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={article.title}
                    onChange={onBlogChange}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  글 내용
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="contents"
                    value={article.contents}
                    rows={3}
                    onChange={onBlogChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => router.push('/blog/list')}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            목록
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  )
}
