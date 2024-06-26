import React, { useState, useEffect } from 'react'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Form,
  Label,
  Input,
  InputGroup,
} from 'reactstrap'

import SimpleBar from 'simplebar-react'

// 연락처정보 목록을 알파벳 인덱스 별로 정렬해서 보여주는 데이터 형식 정의
let sortedContacts = [
  {
    group: 'A',
    children: [{ name: 'Demo' }],
  },
]

const Contacts = () => {
  const [config, setConfig] = useState({
    modal: false,
    contacts: [
      { id: 1, name: 'Albert Rodarte' },
      { id: 2, name: 'Allison Etter' },
      { id: 3, name: 'Craig Smiley' },
      { id: 4, name: 'Daniel Clay' },
      { id: 5, name: 'Doris Brown' },
      { id: 6, name: 'Iris Wells' },
      { id: 7, name: 'Juan Flakes' },
      { id: 8, name: 'John Hall' },
      { id: 9, name: 'Joy Southern' },
      { id: 10, name: 'Mary Farmer' },
      { id: 11, name: 'Mark Messer' },
      { id: 12, name: 'Michael Hinton' },
      { id: 13, name: 'Ossie Wilson' },
      { id: 14, name: 'Phillis Griffin' },
      { id: 15, name: 'Paul Haynes' },
      { id: 16, name: 'Rocky Jackson' },
      { id: 17, name: 'Sara Muller' },
      { id: 18, name: 'Simon Velez' },
      { id: 19, name: 'Steve Walker' },
      { id: 20, name: 'Hanah Mile' },
    ],
  })

  // 모달창 닫고 열 때마다 실행되는 모달속성 제어 이벤트 핸들러
  const toggle = () => {
    setConfig({ ...config, modal: !config.modal })
  }

  // DB에서 가져온 회원정보를 A, B, C단위로 인덱스 형태로 데이터를 재수성해주는 함수
  const sortContact = () => {
    let data = config.contacts.reduce((r, e) => {
      try {
        // get first letter of name of current element
        let group = e.name[0]
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, children: [e] }
        // if there is push current element to children array for that letter
        else r[group].children.push(e)
      } catch (error) {
        return sortedContacts
      }
      // return accumulator
      return r
    }, {})

    // since data at this point is an object, to get array of values
    // we use Object.values method
    let result = Object.values(data)
    setConfig({ ...config, contacts: result })
    // this.setState({ contacts: result });
    sortedContacts = result
    return result
  }

  // 최초 화면 렌더링시 오리지널 데이터를 인덱스형 데이터 구조를 변환시킨다.
  useEffect(() => {
    sortContact()
  }, [])

  return (
    <React.Fragment>
      <div>
        <div className="p-4">
          <div className="user-chat-nav float-end">
            <div id="add-contact">
              {/* Button trigger modal */}
              <Button
                type="button"
                color="link"
                onClick={toggle}
                className="text-decoration-none text-muted font-size-18 py-0"
              >
                <i className="ri-user-add-line"></i>
              </Button>
            </div>
            <UncontrolledTooltip target="add-contact" placement="bottom">
              Add Contact
            </UncontrolledTooltip>
          </div>
          <h4 className="mb-4">Contacts</h4>

          {/* Start Add contact Modal */}
          <Modal isOpen={config.modal} centered toggle={toggle}>
            <ModalHeader tag="h5" className="font-size-16" toggle={toggle}>
              Add Contacts
            </ModalHeader>

            <ModalBody className="p-4">
              <Form>
                <div className="mb-4">
                  <Label className="form-label" htmlFor="addcontactemail-input">
                    Email
                  </Label>
                  <Input type="email" className="form-control" id="addcontactemail-input" placeholder="Enter Email" />
                </div>
                <div>
                  <Label className="form-label" htmlFor="addcontact-invitemessage-input">
                    Invatation Message
                  </Label>
                  <textarea
                    className="form-control"
                    id="addcontact-invitemessage-input"
                    rows="3"
                    placeholder="Enter Message"
                  ></textarea>
                </div>
              </Form>
            </ModalBody>

            <ModalFooter>
              <Button type="button" color="link" onClick={toggle}>
                Close
              </Button>
              <Button type="button" color="primary">
                Invite Contact
              </Button>
            </ModalFooter>
          </Modal>
          {/* End Add contact Modal */}

          <div className="search-box chat-search-box">
            <InputGroup size="lg" className="bg-light rounded-lg">
              <Button color="link" className="text-decoration-none text-muted pr-1" type="button">
                <i className="ri-search-line search-icon font-size-18"></i>
              </Button>
              <Input type="text" className="form-control bg-light " placeholder="Search users.." />
            </InputGroup>
          </div>
          {/* End search-box */}
        </div>
        {/* end p-4 */}

        {/* Start contact lists */}
        <SimpleBar style={{ maxHeight: '100%' }} id="chat-room" className="p-4 chat-message-list chat-group-list">
          {sortedContacts.map((contact, key) => (
            <div key={key} className={key + 1 === 1 ? '' : 'mt-3'}>
              <div className="p-3 fw-bold text-primary">{contact.group}</div>

              <ul className="list-unstyled contact-list">
                {contact.children.map((child, key) => (
                  <li key={key}>
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h5 className="font-size-14 m-0">{child.name}</h5>
                      </div>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="text-muted">
                          <i className="ri-more-2-fill"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem>
                            Share
                            <i className="ri-share-line float-end text-muted"></i>
                          </DropdownItem>
                          <DropdownItem>
                            Block
                            <i className="ri-forbid-line float-end text-muted"></i>
                          </DropdownItem>
                          <DropdownItem>
                            Remove
                            <i className="ri-delete-bin-line float-end text-muted"></i>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </SimpleBar>
        {/* end contact lists */}
      </div>
    </React.Fragment>
  )
}

export default Contacts
