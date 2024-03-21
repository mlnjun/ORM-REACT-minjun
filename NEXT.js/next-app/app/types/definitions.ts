// 전역 단일 게시글 타입 정의
export type Article = {
  article_id?: number
  boeard_type_code?: number
  article_type_code?: number
  title: string
  contents: string | null // 두가지 모두 지원
  view_count?: number
  ip_adress?: string
  is_display_code: number
  reg_date?: string // Date > json문자열 > string
  reg_member_id?: number
  edit_date?: string | null
  edit_member_id?: number | null
}

// 전역 게시글 타입 인터페이스
export interface IArticle {
  article_id?: number
  boeard_type_code?: number
  article_type_code?: number
  title: string
  contents: string | null // 두가지 모두 지원
  is_display_code: number
}

// 전역 단일 회원 데이터 타입 정의
export type Member = {
  email: string
  password: string
  name?: string
}
