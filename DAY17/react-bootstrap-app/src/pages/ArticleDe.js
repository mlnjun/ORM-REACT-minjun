import React, { useState, useRef, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ArticleDe = () => {
  // 단일게시글 정보 구조 정의 및 초기 데이터 정의
  const [article, setAticle] = useState({
    title: '',
    contents: '',
  })

  // modal 창 설정 값들
  // modal : true 창활성화, false 창 비활성화
  const [modal, setModal] = useState(false)

  // validationText : modal창 메세지 내용
  const [validationText, setValidationText] = useState('')

  // delConfirm
  const [delConfirm, setDelConfirm] = useState(false)

  // modalConfig : modal Button 설정
  // 1 : 유효성 검사 실패 알림, 확인(창 닫기)
  // 2 : 수정 삭제 완료알림, 확인(게시글목록 이동)
  // 3 : 삭제 요청 확인 알림, 확인(삭제), 취소(창 닫기)
  const [modalConfig, dispatchModalConfig] = useReducer((state, action) => {
    const toggleModal = () => {
      setModal(!modal)
    }

    switch (action.type) {
      case 1: // 유효성 검사 실패 알림
        return (
          <Button color="primary" onClick={toggleModal}>
            확인
          </Button>
        )
      case 2: // 수정, 삭제 완료 알림
        return (
          <Button color="primary" onClick={() => navigate('articles')}>
            확인
          </Button>
        )
      case 3: // 삭제 요청 확인 알림
        return (
          <div>
            <Button
              color="primary"
              onClick={() => {
                deleteArticle()
                toggleModal()
              }}
            >
              확인
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              취소
            </Button>
          </div>
        )
      default:
        return (
          <Button color="primary" onClick={toggleModal}>
            확인
          </Button>
        )
    }
  }, <></>)

  // URL라우팅 주소에서 게시글 고유번호 추출하기
  const { aid } = useParams()
  console.log('파라미터 변수값 추출하기 : ', aid)

  // 초기 페이지 렌더링시 마우스 포커스 처리를 위한 useRef정의하기
  const refTitle = useRef()

  // 페이지 이동을 위한 navigate훅 생성하기
  const navigate = useNavigate()

  // 최초 로딩시 제목 입력박스에 마우스 포커스 처리하기
  useEffect(() => {
    console.log('최초화면 컴포넌트가 렌더링 됩니다..11111111111')

    // 단일 게시글 정보 바인딩하기
    // Axios는 백엔드 RESTful과 통신시 기본 비동기 통신을 합니다.
    // 백엔드 호출 후 결과값이 전달되면 then 콜백함수에서 처리하며,
    // Axios호출 이후 프로세스가 있다면 이후 프로세스가 먼저 실행된다.
    // axios
    //   .get(`http://localhost:3005/api/articles/${aid}`)
    //   .then((res) => {
    //     console.log('백엔드 데이터 조회결과가 반환되었습니다. 2222222222222')
    //     console.log('단일게시글 정보 출력', res.data)
    //     if (res.data.code == '200') {
    //       // Axios 비동기 통신 시 로직 처리 구현 주의사항
    //       // Axios 사용시 호출결과가 반환되고 반환된 결과 기반에서 추가 로직을 구현해야하는 경우는
    //       // 반드시 then 콜백함수 안에서 로직을 구현해야하고 axios 블럭 밖에서 구현하면
    //       // axios가 기본 비동기 통신기방으로 작동하기 때문에 axios 결과가 반환되지 않았는데도 밖에 로직이 실행됩니다.
    //       setAticle(res.data.data)

    //       // 제목에 포커싱
    //       refTitle.current.focus()
    //     } else {
    //       console.log('백엔드 호출 에러발생 : ', res.data.result)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    getArticle()

    console.log('추가로직이 호출되었습니다. 33333333333')
  }, [])

  // 입력요소 데이터 바인딩 처리
  const onArticleChange = (e) => {
    setAticle({ ...article, [e.target.name]: e.target.value })
  }

  // 저장 버튼 클릭시 데이터 수정 처리 후 게시글 목록으로 이동처리하기
  const onArticleSubmit = (e) => {
    if (article.title == '') {
      // alert('제목을 입력해주세요')
      setValidationText('제목을 입력해주세요')
      setModal(true)
      refTitle.current.focus()
      e.preventDefault()
      return false
    }

    // 게시글 백엔드 데이터 수정 처리하기
    // axios
    //   .post(`http://localhost:3005/api/articles/${aid}`, article)
    //   .then((res) => {
    //     console.log('데이터 수정 처리결과 값 : ', res.data)

    //     if (res.data.code == '200') {
    //       alert('수정완료')

    //       // 게시글 목록 이동 처리
    //       navigate('/articles')
    //     } else {
    //       alert('수정실패')
    //     }
    //   })
    //   .catch()

    postArticleUpdate()

    e.preventDefault()
  }

  // 비동기 axios
  // 게시글 백엔드 데이터 수정 처리
  const postArticleUpdate = async () => {
    try {
      const res = await axios.post(`http://localhost:3005/api/articles/${aid}`, article)

      if (res.data.code == '200') {
        alert('수정완료')
        // 게시글 목록 이동 처리
        navigate('/articles')
      } else {
        alert('수정실패')
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 게시글 데이터 바인딩 처리
  const getArticle = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/api/articles/${aid}`)

      if (res.data.code == '200') {
        setAticle(res.data.data)

        // 제목에 포커싱
        refTitle.current.focus()
      } else {
        console.log('백엔드 호출 에러발생 : ', res.data.result)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 게시글 삭제처리
  const deleteArticle = async () => {
    // 백엔드 삭제 처리
    const res = await axios.delete(`http://localhost:3005/api/articles/${aid}`)

    if (res.data.code == '200') {
      alert('삭제 완료')
      navigate('/articles')
    } else {
      alert('삭제 실패')
    }
  }

  // 삭제
  const onRemove = () => {
    setValidationText('정말 삭제하시겠습니까')
    dispatchModalConfig({ type: 3 })
    setModal(true)
  }

  // const toggleModal = () => {
  //   setModal(!modal)
  // }

  return (
    <div className="article-wrapper">
      <div className="row mb-3 mt-3">
        <div className="col">
          <h4>게시글 작성</h4>
        </div>
      </div>

      <form onSubmit={onArticleSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">제목</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              name="title"
              value={article.title}
              onChange={onArticleChange}
              ref={refTitle}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">내용</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              name="contents"
              value={article.contents}
              onChange={onArticleChange}
            ></textarea>
          </div>
        </div>

        <div className="row text-center mb-2">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              저장
            </button>
            <button type="button" className="btn btn-danger" onClick={onRemove}>
              삭제
            </button>
            <button type="button" className="btn btn-info" onClick={() => navigate('/articles')}>
              목록
            </button>
          </div>
        </div>
      </form>

      <Modal isOpen={modal}>
        <ModalHeader>유효성 검사</ModalHeader>
        <ModalBody>{validationText}</ModalBody>
        <ModalFooter>{modalConfig}</ModalFooter>
      </Modal>
    </div>
  )
}

export default ArticleDe
