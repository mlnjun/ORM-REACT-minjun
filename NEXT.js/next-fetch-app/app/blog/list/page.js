'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function BlogList() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    // fetch를 통해 백엔드에서 데이터 불러오기

    const fetchData = async () => {
      const response = await fetch('http://localhost:3005/api/articles', {
        method: 'get',
        headers: {
          //Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      console.log('처리결과 데이터:', result)

      if (result.code == '200') {
        setArticles(result.data)
      }
    }

    fetchData().catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e)
    })
  }, [])

  return (
    <div>
      <h3>블로그 목록</h3>
      <Link href="/blog/create">게시글 작성</Link>
      <div>
        <h3>블로그 목록</h3>
        <Link href="/blog/create">신규 게시글 작성</Link>
        <table className="table-auto">
          <thead>
            <tr>
              <th>글제목</th>
              <th>조회수</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={index}>
                <td>
                  <Link href={`/blog/${article.article_id}`}>{article.title}</Link>
                </td>
                <td>{article.view_count}</td>
                <td>{article.reg_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
