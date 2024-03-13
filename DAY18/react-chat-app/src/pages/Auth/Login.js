import React, { useCallback, useEffect, useContext, useRef } from 'react'

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Alert,
  Form,
  Input,
  Button,
  FormFeedback,
  Label,
  InputGroup,
} from 'reactstrap'

import { connect, useDispatch } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'

// axios
import axios from 'axios'

// 리액트에서 form을 다루는 코드들을 쉽게 작성할 수 있도록 도와주는 패키지
import { useFormik } from 'formik'

// 폼의 유효성을 검사하는 yup 패키지
import * as Yup from 'yup'

// 사용자 인증 페이지 모달 참조
import AuthModal from './Modal/AuthModal'

// 비인증 페이지 전역 상태 변수 참조
import { NonAuthContext } from '../../layouts/NonAuthLayout'

import logodark from '../../assets/images/logo-dark.png'
import logolight from '../../assets/images/logo-light.png'

const Login = (props) => {
  // useRef 훅 함수
  const refEmail = useRef()
  const refPassword = useRef()

  // Context 상태 불러오기
  const { modal, toggle, modalMsg, setModalMsg } = useContext(NonAuthContext)

  const navigate = useNavigate()

  // 폼 유효성검사 및 폼데이터 처리
  const formik = useFormik({
    // 폼 요소 속성 정의 + 기본 값
    initialValues: {
      email: '',
      password: '',
    },
    // 유효성 검사
    validationSchema: Yup.object({
      email: Yup.string().required('이메일을 입력하세요'),
      password: Yup.string().required('암호를 입력하세요'),
    }),
    onSubmit: async (values) => {
      // 로그인 로직
      try {
        const member = {
          email: values.email,
          password: values.password,
        }

        const res = await axios.post('http://localhost:3005/api/member/login', member)

        if (res.data.code == '200') {
          // 토큰 저장
          localStorage.setItem('authUser', res.data.token)
          navigate('/')
        } else if (res.data.code == '400') {
          // 에러 내용에 따른 사용자 오류 메세지 모달 창 출력
          switch (res.data.result) {
            case 'notExistEmail':
              refEmail.current.focus()
              setModalMsg('해당 이메일은 존재하지 않습니다.')
              toggle()
              return false
            case 'notCorrectPassword':
              refPassword.current.focus()
              setModalMsg('암호가 일치하지 않습니다.')
              toggle()
              return false
            default:
              return false
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
  })

  document.title = '로그인'

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="text-center mb-4">
                <Link to="/" className="auth-logo mb-5 d-block">
                  <img src={logodark} alt="" height="30" className="logo logo-dark" />
                  <img src={logolight} alt="" height="30" className="logo logo-light" />
                </Link>

                <h4>Sign in</h4>
                <p className="text-muted mb-4">Sign in to continue to Chatvia.</p>
              </div>

              <Card>
                <CardBody className="p-4">
                  {props.error && <Alert color="danger">{props.error}</Alert>}
                  <div className="p-3">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault()
                        formik.handleSubmit()
                        // postLogin()
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Username</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                          <span className="input-group-text text-muted" id="basic-addon3">
                            <i className="ri-user-2-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="email"
                            name="email"
                            // reactstrap에서는 ref속성은 innerRef로
                            innerRef={refEmail}
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Enter email"
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            value={formik.values.email}
                            invalid={formik.touched.email && formik.errors.email ? true : false}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                          ) : null}
                        </InputGroup>
                      </div>

                      <FormGroup className="mb-4">
                        <div className="float-end">
                          <Link to="/forget-password" className="text-muted font-size-13">
                            Forgot password?
                          </Link>
                        </div>
                        <Label className="form-label">Password</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                          <span className="input-group-text text-muted">
                            <i className="ri-lock-2-line"></i>
                          </span>
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            // reactstrap에서는 ref속성은 innerRef로
                            innerRef={refPassword}
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Enter Password"
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            value={formik.values.password}
                            invalid={formik.touched.password && formik.errors.password ? true : false}
                          />
                          {formik.touched.password && formik.errors.password ? (
                            <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                          ) : null}
                        </InputGroup>
                      </FormGroup>

                      <div className="form-check mb-4">
                        <Input type="checkbox" className="form-check-input" id="remember-check" />
                        <Label className="form-check-label" htmlFor="remember-check">
                          Remember me?
                        </Label>
                      </div>

                      <div className="d-grid">
                        <Button color="primary" block className=" waves-effect waves-light" type="submit">
                          Sign in
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register" className="font-weight-medium text-primary">
                    Signup now{' '}
                  </Link>{' '}
                </p>
                <p>
                  {new Date().getFullYear()} Chatvia.Crafted with <i className="mdi mdi-heart text-danger"></i> by
                  Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <AuthModal toggle={toggle} modal={modal} modalMsg={modalMsg}></AuthModal>
      </div>
    </React.Fragment>
  )
}

export default Login
