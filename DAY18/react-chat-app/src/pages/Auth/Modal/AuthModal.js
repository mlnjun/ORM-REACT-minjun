import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const AuthModal = ({ toggle, modal, modalMsg }) => {
  return (
    <div>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>알림</ModalHeader>
        <ModalBody>{modalMsg}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            확인
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default AuthModal
