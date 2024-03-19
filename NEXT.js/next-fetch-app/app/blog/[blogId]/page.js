'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function BlogDetail(props) {
  const router = useRouter()

  console.log('props정보 확인하기 : ', props)

  const articleId = props.params.blogId

  const [article, setArticle] = useState({})

  useEffect(() => {
    axios
      .get(`http://localhost:3005/api/articles/${articleId}`)
      .then((res) => {
        if (res.data.code === '200') {
          setArticle(res.data.data)
        } else if (res.data.code === '500') {
          console.log('서버 에러')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const onBlogChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  }

  const onBlogSubmit = (e) => {
    e.preventDefault()

    const fetchData = async () => {
      const response = await fetch(`http://localhost:3005/api/articles/${articleId}`, {
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
      <h3>블로그 상세 - {articleId}</h3>
      <div>
        <form onSubmit={onBlogSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">게시글 수정</h2>
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
    </div>
  )
}
