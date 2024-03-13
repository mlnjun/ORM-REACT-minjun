import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// root div태그안에 app.js 컴포넌트의 번들링된 결과물을 바인딩해서
// 리액트앱의 메인 화면을 출력합니다.
root.render(
  // React.StricMode : 리액트앱 안에서의 잡재적 문제점을 알아내고 안전하지 않은 것들에 대해서 경고해주기 위한 개발시 지원모드
  // React App(app.js) :실행시 잠재적 위험요소들에 대해 터미널에 표기할때는 <React.StricMode>로 app.js를 감싸주고
  // 실제 운영(프로덕션)환경에서는 해당 코드가 작동하지 않는다.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
