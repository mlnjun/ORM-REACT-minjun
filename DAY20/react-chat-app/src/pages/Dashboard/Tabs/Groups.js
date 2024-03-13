import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Form,
  Label,
  Input,
  Collapse,
  CardHeader,
  CardBody,
  Alert,
  InputGroup,
  Card,
  Badge,
} from 'reactstrap'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
import axios from 'axios'

// import { withTranslation } from 'react-i18next'

//simple bar
import SimpleBar from 'simplebar-react'

//components
// import SelectContact from '../../../components/SelectContact'

//actions
// import { createGroup } from '../../../redux/actions'

import avatar2 from '../../../assets/images/users/avatar-2.jpg'
import avatar4 from '../../../assets/images/users/avatar-4.jpg'
import avatar3 from '../../../assets/images/users/avatar-3.jpg'
import avatar6 from '../../../assets/images/users/avatar-6.jpg'
import avatar7 from '../../../assets/images/users/avatar-7.jpg'
import avatar8 from '../../../assets/images/users/avatar-8.jpg'
// import member from '../../../../../node-rest-app/models/member'

// 오리지널 데이터를 인덱스 형태로 편집한 구조의 전역변수
let sortedContacts = [
  // 구조만 보여줄 뿐 없어도 되는 부분
  {
    group: 'A',
    children: [{ id: 0, name: 'Demo', isChecked: false }],
  },
]

function Groups(props) {
  // 설정 상태변수
  const [config, setConfig] = useState({
    modal: false,
    isOpenCollapse: false,
    groups: [],
    selectedContact: [],
    isOpenAlert: false,
    message: '',
    groupName: '',
    groupDesc: '',
    contacts: [
      { id: 1, name: 'Albert Rodarte', isChecked: false },
      { id: 2, name: 'Allison Etter', isChecked: false },
      { id: 3, name: 'Craig Smiley', isChecked: false },
      { id: 4, name: 'Daniel Clay', isChecked: false },
      { id: 5, name: 'Doris Brown', isChecked: false },
      { id: 6, name: 'Iris Wells', isChecked: false },
      { id: 7, name: 'Juan Flakes', isChecked: false },
      { id: 8, name: 'John Hall', isChecked: false },
      { id: 9, name: 'Joy Southern', isChecked: false },
      { id: 10, name: 'Mary Farmer', isChecked: false },
      { id: 11, name: 'Mark Messer', isChecked: false },
      { id: 12, name: 'Michael Hinton', isChecked: false },
      { id: 13, name: 'Ossie Wilson', isChecked: false },
      { id: 14, name: 'Phillis Griffin', isChecked: false },
      { id: 15, name: 'Paul Haynes', isChecked: false },
      { id: 16, name: 'Rocky Jackson', isChecked: false },
      { id: 17, name: 'Sara Muller', isChecked: false },
      { id: 18, name: 'Simon Velez', isChecked: false },
      { id: 19, name: 'Steve Walker', isChecked: false },
      { id: 20, name: 'Hanah Mile', isChecked: false },
    ],
  })

  // 전체 회원 목록
  // const [memberList, setMemberList] = useState([])

  // 채널 등록 팝업창 오픈/닫기 관리 이벤트 핸들러
  function toggle() {
    setConfig((prevConfig) => ({ ...config, modal: !config.modal }))
  }

  // 멤버 리스트 영역 보여주기 토글기능 구현
  const toggleCollapse = () => {
    setConfig({ ...config, isOpenCollapse: !config.isOpenCollapse })
  }

  // 그룹 생성 실습 코드
  // function createGroup() {
  //   if (config.selectedContact.length > 2) {
  //     // gourpId : 5, name : "#Project-aplha", profilePicture : "Null", isGroup : true, unRead : 0, isNew : true, desc : "project related Group",
  //     var obj = {
  //       // members: config.selectedContact,
  //       gourpId: config.groups.length + 1,
  //       name: '#' + config.groupName,
  //       profilePicture: 'Null',
  //       isGroup: true,
  //       unRead: 0,
  //       desc: config.groupDesc,
  //       members: [
  //         { userId: 1, name: 'Sara Muller', profilePicture: 'Null', role: null },
  //         {
  //           userId: 2,
  //           name: 'Ossie Wilson',
  //           profilePicture: avatar8,
  //           role: 'admin',
  //         },
  //         {
  //           userId: 3,
  //           name: 'Jonathan Miller',
  //           profilePicture: 'Null',
  //           role: null,
  //         },
  //         { userId: 4, name: 'Paul Haynes', profilePicture: avatar7, role: null },
  //         { userId: 5, name: 'Yana sha', profilePicture: avatar3, role: null },
  //         {
  //           userId: 6,
  //           name: 'Steve Walker',
  //           profilePicture: avatar6,
  //           role: null,
  //         },
  //       ],
  //     }
  //     // redux의 전역 함수 실행 > DB에 그룹 데이터 생성
  //     // props.createGroup(obj)

  //     //
  //     // toggle 함수를 사용할 경우 그룹 추가 setter함수 실해되는 도중에 덮어 씌운다.
  //     // 동기방식으로 실행되기 때문
  //     setConfig((prevConfig) => ({ ...prevConfig, groups: [...prevConfig.groups, obj], modal: false }))
  //     // console.log(config)
  //   } else if (config.selectedContact.length === 1) {
  //     setConfig({ ...config, message: 'Minimum 2 members required!!!', isOpenAlert: true })
  //   } else {
  //     setConfig({ ...config, message: 'Please Select Members!!!', isOpenAlert: true })
  //   }
  //   // setTimeout(
  //   //   function () {
  //   //     setConfig({ ...config, isOpenAlert: false })
  //   //   }.bind(this),
  //   //   3000,
  //   // )
  // }

  // 모달창에 그룹정보 데이터 바인딩 처리
  const onGruopChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value })
  }

  // 초대 멤버 추가 함수(실습 코드)
  // const inviteUser = (e, member) => {
  //   setConfig({
  //     ...config,
  //     selectedContact: [
  //       ...config.selectedContact,
  //       { userId: member.member_id, name: member.name, profilePicture: 'Null', role: null },
  //     ],
  //   })
  // }

  // 회원 목록 불러오기
  // useEffect(() => {
  //   try {
  //     let members = []

  //     axios
  //       .get('http://localhost:3005/api/member/')
  //       .then((res) => {
  //         setMemberList(res.data.data)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })

  //     console.log(memberList)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }, [])

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

  useEffect(() => {
    // 모달 팝업 회원목록 데이터 바인딩
    sortContact()
    getChannels()
  }, [])

  const getChannels = () => {
    // 그룹데이터 목록 데이터 바인딩 처리
    axios
      .get('http://localhost:3005/api/chat/channels')
      .then((res) => {
        console.log('채널목록 조회 결과 : ', res.data.data)
        setConfig({ ...config, groups: res.data.data, modal: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 모달 팝업내에서 체크박스 체크/헤제시 관련 이벤트 처리하기
  const handleCheck = (e, contactId) => {
    // 체크박스가 체크된경우 선택사용자 정보 추가하기
    if (e.target.checked) {
      // 선택한 사용자의 주요 정보 추출하기
      var selectMember = {
        id: contactId,
        name: e.target.value,
      }
      // 기존 선택된 사용자 목록 배열의 복사본을 만들고 신규 사용자 객체를 추가한다.
      setConfig({ ...config, selectedContact: [...config.selectedContact, selectMember] })
    } else if (config.selectedContact !== undefined) {
      setConfig({ ...config, selectedContact: config.selectedContact.filter((v) => v.id !== contactId) })
    }
  }

  // 체크 적용/해제 시 마다 config.selectedContact 값 확인
  useEffect(() => {
    console.log(config.selectedContact)
  }, [config.selectedContact])

  // 신규 채팅방 그룹 추가하기
  const onSaveGroup = () => {
    const groupData = {
      channel: {
        category_code: 2,
        channel_name: config.groupName,
        channel_desc: config.groupDesc,
      },
      channelMembers: config.selectedContact,
    }
    // axios로 데이터 등록 처리하기
    axios
      .post('http://localhost:3005/api/chat/channel', groupData)
      .then((res) => {
        console.log('신규채널 생성 결과 : ', res.data)
        if (res.data.code === '200') {
          // setConfig({ ...config, modal: false })
          getChannels()
        }
      })
      .catch((err) => {
        console.log('백엔드 호출 에러 발생', err)
      })
  }

  // const { t } = props
  return (
    <React.Fragment>
      <div>
        {/* 상단 헤더영역 */}
        <div className="p-4">
          <div className="user-chat-nav float-end">
            <div id="create-group">
              {/* 신규 그룹채널 추가 아이콘 클릭 버튼 */}
              <Button
                onClick={toggle}
                type="button"
                color="link"
                className="text-decoration-none text-muted font-size-18 py-0"
              >
                <i className="ri-group-line me-1"></i>
              </Button>
            </div>
            <UncontrolledTooltip target="create-group" placement="bottom">
              Create group
            </UncontrolledTooltip>
          </div>
          <h4 className="mb-4">Groups</h4>

          {/* 신규 채널등록 모달팝업 */}
          <Modal isOpen={config.modal} centered toggle={toggle}>
            <ModalHeader tag="h5" className="modal-title font-size-14" toggle={toggle}>
              그룹 생성
            </ModalHeader>

            <ModalBody className="p-4">
              <Form>
                <div className="mb-4">
                  <Label className="form-label" htmlFor="addgroupname-input">
                    그룹 이름
                  </Label>
                  <Input
                    type="text"
                    name="groupName"
                    className="form-control"
                    id="addgroupname-input"
                    value={config.groupName}
                    onChange={onGruopChange}
                    placeholder="Enter Group Name"
                  />
                </div>
                <div className="mb-4">
                  <Label className="form-label">Group Members</Label>
                  <Alert isOpen={config.isOpenAlert} color="danger">
                    {config.message}
                  </Alert>
                  <div className="mb-3">
                    <Button color="light" size="sm" type="button" onClick={toggleCollapse}>
                      Select Members
                    </Button>
                  </div>

                  {/* 회원 목록 출력영역 */}
                  <Collapse isOpen={config.isOpenCollapse} id="groupmembercollapse">
                    <Card className="border">
                      <CardHeader>
                        <h5 className="font-size-15 mb-0">Contacts</h5>
                      </CardHeader>
                      <CardBody className="p-2">
                        <SimpleBar style={{ maxHeight: '150px' }}>
                          {/* contacts */}
                          <div id="addContacts">
                            {/* 멤버 리스트 실습 코드 */}
                            {/* {memberList.map((item, index) => (
                              <li key={index}>
                                <div className="form-check">
                                  <Input
                                    type="checkbox"
                                    className="form-check-input"
                                    onChange={(e) => inviteUser(e, item.member_id)}
                                    id={'memberCheck' + item.member_id}
                                    value={item.name}
                                  />
                                  <Label className="form-check-label" htmlFor={'memberCheck' + item.member_id}>
                                    {item.name}
                                  </Label>
                                </div>
                              </li>
                            ))} */}
                            {/* 멤버 리스트 */}
                            {sortedContacts.map((contact, key) => (
                              <div key={key}>
                                <div className="p-3 font-weight-bold text-primary">{contact.group}</div>

                                <ul className="list-unstyled contact-list">
                                  {contact.children.map((child, keyChild) => (
                                    <li key={keyChild}>
                                      <div className="form-check">
                                        <Input
                                          type="checkbox"
                                          className="form-check-input"
                                          onChange={(e) => handleCheck(e, child.id)}
                                          id={'memberCheck' + child.id}
                                          value={child.name}
                                        />
                                        <Label className="form-check-label" htmlFor={'memberCheck' + child.id}>
                                          {child.name}
                                        </Label>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </SimpleBar>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>

                <div>
                  <Label className="form-label" htmlFor="addgroupdescription-input">
                    Description
                  </Label>
                  <textarea
                    name="groupDesc"
                    className="form-control"
                    id="addgroupdescription-input"
                    value={config.groupDesc}
                    onChange={onGruopChange}
                    rows="3"
                    placeholder="Enter Description"
                  ></textarea>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="link" onClick={toggle}>
                Close
              </Button>
              <Button type="button" color="primary" onClick={onSaveGroup}>
                Create Group
              </Button>
            </ModalFooter>
          </Modal>
          {/* End add group Modal */}

          <div className="search-box chat-search-box">
            <InputGroup size="lg" className="bg-light rounded-lg">
              <Button color="link" className="text-decoration-none text-muted pr-1" type="button">
                <i className="ri-search-line search-icon font-size-18"></i>
              </Button>
              <Input type="text" className="form-control bg-light" placeholder="Search groups..." />
            </InputGroup>
          </div>
          {/* end search-box */}
        </div>

        {/* Start chat-group-list */}
        <SimpleBar style={{ maxHeight: '100%' }} className="p-4 chat-message-list chat-group-list">
          <ul className="list-unstyled chat-list">
            {config.groups.map((group, key) => (
              <li key={key}>
                <Link to="#">
                  <div className="d-flex align-items-center">
                    <div className="chat-user-img me-3 ms-0">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                          {group.channel_name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="text-truncate font-size-14 mb-0">
                        {group.channel_name}
                        {/* {group.unRead !== 0 ? (
                          <Badge color="none" pill className="badge-soft-danger float-end">
                            {group.unRead >= 20 ? group.unRead + '+' : group.unRead}
                          </Badge>
                        ) : null} */}

                        {/* {group.isNew && (
                          <Badge color="none" pill className="badge-soft-danger float-end">
                            New
                          </Badge>
                        )} */}
                      </h5>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </SimpleBar>
        {/* End chat-group-list */}
      </div>
    </React.Fragment>
  )
}

// const mapStateToProps = (state) => {
//   const { groups, active_user } = state.Chat
//   return { groups, active_user }
// }

// export default connect(mapStateToProps, { createGroup })(withTranslation()(Groups))

export default Groups