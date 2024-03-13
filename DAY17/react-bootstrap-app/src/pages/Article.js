import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// reactstrap Modal
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const Article = () => {
  // 단일게시글 정보 구조 정의 및 초기 데이터 정의
  const [article, setAticle] = useState({
    title: '',
    contents: '',
  })

  // 모달 팝업 오픈제어 상태값 정의하기
  const [modal, setModal] = useState(false)

  // 모달 팝업 유효성 검사 메시지
  const [validationText, setValidationText] = useState('')

  const [modalInfo, setModalInfo] = useState(1)

  // 초기 페이지 렌더링시 마우스 포커스 처리를 위한 useRef정의하기
  const refTitle = useRef()

  // 페이지 이동을 위한 navigate훅 생성하기
  const navigate = useNavigate()

  // 최초 로딩시 제목 입력박스에 마우스 포커스 처리하기
  useEffect(() => {
    refTitle.current.focus()
  }, [])

  // 입력요소 데이터 바인딩 처리
  const onArticleChange = (e) => {
    setAticle({ ...article, [e.target.name]: e.target.value })
  }

  // 저장 버튼 클릭시 데이터 저장 처리 후 게시글 목록으로 이동처리하기
  const onArticleSubmit = (e) => {
    if (article.title == '') {
      // alert('제목을 입력해주세요')
      setValidationText('제목을 입력해주세요')
      setModal(true)

      // 제목으로 마우스 포커싱
      refTitle.current.focus()

      e.preventDefault()
      return false
    }

    // axios
    //   .post('http://localhost:3005/api/articles', article)
    //   .then((res) => {
    //     console.log('데이터 처리결과 값 : ', res.data)

    //     if (res.data.code == '200') {
    //       alert('등록완료')
    //       navigate('/articles')
    //     } else {
    //       alert('등록실패')
    //     }
    //   })
    //   .catch()

    postArticleUpload(e)

    e.preventDefault()
  }

  // 비동기 방식 axios

  // axios: article 등록
  const postArticleUpload = async (e) => {
    try {
      const res = await axios.post('http://localhost:3005/api/articles', article)

      if (res.data.code == '200') {
        // alert('등록완료')
        setValidationText('등록 완료')
        setModalInfo(2)
        setModal(true)
      } else {
        setValidationText('등록 실패')
        setModal(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 모달팝업 제어 핸들러
  const toggleModal = () => {
    setModal(!modal)
  }

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
          </div>
        </div>
      </form>

      {/* <Button color="danger" onClick={toggleModal}>
        Click Me
      </Button> */}

      <Modal isOpen={modal}>
        <ModalHeader>유효성 검사</ModalHeader>
        <ModalBody>{validationText}</ModalBody>
        <ModalFooter>
          {
            modalInfo === 1 ? (
              <Button color="primary" onClick={toggleModal}>
                확인
              </Button>
            ) : (
              <Button color="primary" onClick={() => navigate('/articles')}>
                확인
              </Button>
            )
          }
          {/* <Button color="secondary" onClick={toggleModal}>
            취소
          </Button> */}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Article
