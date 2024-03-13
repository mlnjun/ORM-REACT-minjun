import React from 'react'

import { TabContent, TabPane } from 'reactstrap'

import { connect } from 'react-redux'

import { setActiveTab } from '../../redux/actions'

//현재 사용자의 프로필 정보 표시 컴포넌트
import Profile from './Tabs/Profile'

//채팅영역 컴포넌트
import Chats from './Tabs/Chats'
import Groups from './Tabs/Groups'
import Contacts from './Tabs/Contacts'

const ChatLeftSidebar = (props) => {
  //현재 전역메뉴 선택된 탭아이디 정보조회-리덕스 전역데이터에서 호출(Layout리듀서에서)
  //채팅 탭 선택 기능을 아래 변수에 선택 적용해서 컴포넌트를 선택해 출력할수 있습니다.
  // const activeTab = "profile"; //props.activeTab;
  // const activeTab = 'profile'
  // const activeTab = 'group'
  // const activeTab = "contacts";
  // const activeTab = "settings";
  const activeTab = props.activeTab

  return (
    <React.Fragment>
      <div className="chat-leftsidebar me-lg-1">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="profile" id="pills-user">
            <Profile />
          </TabPane>

          <TabPane tabId="chat" id="pills-chat">
            <Chats recentChatList={props.recentChatList} />
          </TabPane>

          <TabPane tabId="group" id="pills-groups">
            <Groups />
          </TabPane>

          <TabPane tabId="contacts" id="pills-contacts">
            <Contacts />
          </TabPane>

          {/* <TabPane tabId="settings" id="pills-setting">
            <Settings />
          </TabPane> */}
        </TabContent>
      </div>
    </React.Fragment>
  )
}

// export default ChatLeftSidebar

const mapStateToProps = (state) => {
  const { activeTab } = state.Layout
  return { activeTab }
}

// connect(전역데이터 속성을 props 하위속성으로 넣어주는 함수호출, {props 하위 함수로액션함수 넣기})(함수 컴포넌트)
// 첫번째 파라미터 > props에 전역데이터 값 넣기
export default connect(mapStateToProps, { setActiveTab })(ChatLeftSidebar)
