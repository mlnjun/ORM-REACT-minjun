import React, { createContext, useState } from 'react'

//  Context 생성
export const NonAuthContext = createContext()

// Context Provider
function NonAuthStateProvider({ children }) {
  // modal 활성화 상태
  const [modal, setModal] = useState(false)

  // modal 메세지 상태
  const [modalMsg, setModalMsg] = useState('')

  // modal toggle 함수
  const toggle = () => {
    setModal(!modal)
  }

  return (
    <NonAuthContext.Provider
    // 전달 변수, 함수
    // modal : modal 활성화 상태, toggle : 모달 비활성/활성화 함수, modalMsg : modal 메세지 상태, setModalMsg : modal 메세지 상태 변경 setter 함수
      value={{
        modal,
        toggle,
        modalMsg,
        setModalMsg,
      }}
    >
      {children}
    </NonAuthContext.Provider>
  )
}

const NonAuthLayout = (props) => {
  return (
    <React.Fragment>
      <NonAuthStateProvider>{props.children}</NonAuthStateProvider>
    </React.Fragment>
  )
}

export default NonAuthLayout
