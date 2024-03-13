import React, { useState } from "react";

const DataBindingTest = () => {
  // 텍스트 박스 메시지 바인딩 데이터 정의 및 초기값 할당
  const [message, setMessage] = useState("안녕하세요.");

  // 메시지 입력 UI요소의 입력값이 변경될 때마다 입력 이벤트를 처리해주는 이벤트 핸들러함수
  const handleMessage = (e) => {
    // 이벤트가 발생한 입력요소를 찾고 입력요소의 현재 입력값을 추출해서 콘솔에 출력해본다.
    console.log("사용자 입력이벤트가 발생했습니다.", e.target.value);
    setMessage(e.target.value);
  };

  // 데이터 바인딩 기법을 통해 UI를 개발하는 MVVM패턴에서 가장 중요한 점은
  // 데이터의 구조와 데이터의 값에 따라 UI가 제어되기 때문에
  // 화면/컴포넌트에서 사용하는 데이터의 구조를 먼저 정의하고 관련 UI요소에 적절한 데이터 바인딩이 이루어져야하다.

  // message 데이터 State값을 초기화해서 바인딩되어 있는 각종 UI의 값을 초기화 처리한다.
  const handleInit = () => {
    setMessage("");
  };

  return (
    <div>
      메시지값:<p>{message}</p>
      <hr />
      {/* onChange 이벤트는 입력요소의 값이 바뀔 때마다 발생하는 이벤트입니다.
      텍스트박스에 입력값이 바뀔 때마다 바인딩된 데이터 소스{해당 DATA State}를 변경해줘야한다. - 양방향 데이터 바인딩 */}
      <input
        type="text"
        name="message"
        placeholder="메시지를 입력해주세요."
        value={message}
        onChange={handleMessage}
      />
      <button onClick={handleInit}>초기화</button>
    </div>
  );
};

export default DataBindingTest;
