import React, { useState, useEffect } from 'react'

import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Card } from 'reactstrap'

// redux 전역상태를 바인딩하기 위한 useSelector 훅
import { useSelector } from 'react-redux'

// axios
import axios from 'axios'

import moment from 'moment'

//아코디언 탭 구현 컴포넌트
import CustomCollapse from '../../../components/CustomCollapse'

//Import Images
import avatar1 from '../../../assets/images/users/avatar-1.jpg'

const Profile = (props) => {
  //현재 로그이한 사용자의 정보를 저장하기위한 사용자 상태값 정의
  const [user, setUser] = useState({})

  // 토큰
  const token = useSelector((state) => state.Auth.token)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isOpen1, setIsOpen1] = useState(true)
  const [isOpen2, setIsOpen2] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3005/api/member/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.data.reg_date)
        res.data.data.reg_date = moment(res.data.data.reg_date).format('YYYY-MM-DD hh:mm')
        setUser(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1)
    setIsOpen2(false)
  }

  const toggleCollapse2 = () => {
    setIsOpen2(!isOpen2)
    setIsOpen1(false)
  }

  const toggle = () => setDropdownOpen(!dropdownOpen)

  return (
    <React.Fragment>
      <div>
        <div className="px-4 pt-4">
          <div className="user-chat-nav float-end">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle tag="a" className="font-size-18 text-muted dropdown-toggle">
                <i className="ri-more-2-fill"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <h4 className="mb-0">My Profile</h4>
        </div>

        <div className="text-center p-4 border-bottom">
          <div className="mb-4">
            <img src={user.profile_img_path} className="rounded-circle avatar-lg img-thumbnail" alt="chatvia" />
          </div>

          <h5 className="font-size-16 mb-1 text-truncate">{user.name}</h5>
          <p className="text-muted text-truncate mb-1">
            <i className="ri-record-circle-fill font-size-10 text-success me-1 d-inline-block"></i> Active
          </p>
        </div>
        {/* End profile user  */}

        {/* Start user-profile-desc */}
        <div className="p-4 user-profile-desc">
          <div className="text-muted">
            <p className="mb-4">
              If several languages coalesce, the grammar of the resulting language is more simple and regular than that
              of the individual.
            </p>
          </div>

          <div id="profile-user-accordion-1" className="custom-accordion">
            <Card className="shadow-none border mb-2">
              {/* import collaps */}
              <CustomCollapse
                title="About"
                iconClass="ri-user-2-line"
                isOpen={isOpen1}
                toggleCollapse={toggleCollapse1}
              >
                <div>
                  <p className="text-muted mb-1">Name</p>
                  <h5 className="font-size-14">{user.name}</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Email</p>
                  <h5 className="font-size-14">{user.email}</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Time</p>
                  <h5 className="font-size-14">{user.reg_date}</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Location</p>
                  <h5 className="font-size-14 mb-0">California, USA</h5>
                </div>
              </CustomCollapse>
            </Card>
            {/* End About card  */}

            {/* End Attached Files card  */}
          </div>
          {/* end profile-user-accordion  */}
        </div>
        {/* end user-profile-desc  */}
      </div>
    </React.Fragment>
  )
}

export default Profile
