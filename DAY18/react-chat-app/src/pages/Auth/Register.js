import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

// 폼 관련 패키지
import { useFormik } from 'formik'
import * as Yup from 'yup'

// reactstrap
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

// 사용자 인증 페이지 모달 참조
import AuthModal from './Modal/AuthModal'

// 비인증 페이지 전역 상태 변수 참조
import { NonAuthContext } from '../../layouts/NonAuthLayout'

// 이미지
import logodark from '../../assets/images/logo-dark.png'
import logolight from '../../assets/images/logo-light.png'

const Register = () => {
  // Context 상태 불러오기
  const { modal, toggle, modalMsg, setModalMsg } = useContext(NonAuthContext)

  // useNavigate 훅 함수
  const navigate = useNavigate()

  // formik 패키지로 폼 데이터 바인딩, 관리
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Please Input UserName'),
      // .email('알림메세지') : 이메일 형식 검사
      email: Yup.string().email('Enter proper email').required('Please Enter Your Email'),
      password: Yup.string().required('Please Enter Your Password'),
    }),
    onSubmit: async (values) => {
      // 회원가입 로직
      const member = {
        email: values.email,
        password: values.password,
        name: values.username,
      }

      const res = await axios.post('http://localhost:3005/api/member/entry', member)

      if (res.data.code == '200') {
        // alert('가입 완료')
        setModalMsg('가입완료')
        toggle()
        navigate('/login')
      } else if (res.data.code == '400') {
        // alert('동일한 이메일이 존재합니다.')
        setModalMsg('이미 동일한 이메일이 존재합니다.')
        toggle()
        document.getElementById('email').focus()
      } else if (res.data.code == '500') {
        setModalMsg('가입 실패')
        toggle()
      }
    },
  })

  document.title = '회원가입'

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

                <h4>Register</h4>
                <p className="text-muted mb-4">Get your Chatvia account now.</p>
              </div>

              <Card>
                <CardBody className="p-4">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault()
                      formik.handleSubmit()
                      // postMemberEntry()

                      // return false;
                    }}
                  >
                    <div className="mb-3">
                      <Label className="form-label">Email</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <span className="input-group-text text-muted">
                          <i className="ri-mail-line"></i>
                        </span>
                        <Input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Enter Email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          invalid={formik.touched.email && formik.errors.email ? true : false}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Username</Label>
                      <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                        <span className="input-group-text border-light text-muted">
                          <i className="ri-user-2-line"></i>
                        </span>
                        <Input
                          type="text"
                          id="username"
                          name="username"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Enter Username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          invalid={formik.touched.username && formik.errors.username ? true : false}
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <FormFeedback type="invalid">{formik.errors.username}</FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <FormGroup className="mb-4">
                      <Label className="form-label">Password</Label>
                      <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                        <span className="input-group-text border-light text-muted">
                          <i className="ri-lock-2-line"></i>
                        </span>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Enter Password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          invalid={formik.touched.password && formik.errors.password ? true : false}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                        ) : null}
                      </InputGroup>
                    </FormGroup>

                    <div className="d-grid">
                      <Button color="primary" block className=" waves-effect waves-light" type="submit">
                        Register
                      </Button>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-muted mb-0">
                        By registering you agree to the Chatvia
                        <Link to="#" className="text-primary">
                          Terms of Use
                        </Link>
                      </p>
                    </div>
                  </Form>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="font-weight-medium text-primary">
                    Signin{' '}
                  </Link>{' '}
                </p>
                <p>
                  짤 {new Date().getFullYear()} hatvia. Crafted with<i className="mdi mdi-heart text-danger"></i> by
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

export default Register
