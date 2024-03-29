import logo from './logo.svg'
import './App.css'

function App() {
  // 해당 컴포넌트의 로직 구현영역
  console.log('App.js 화면이 렌더링 됩니다.')

  // console.error("강제 에러발생");
  // console.warn("경고메세지 출력");
  // console.info("개발과 관련된 추가정보를 출력");
  // document.write("웹페이지에 텍스트를 출력합니다.");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>리액트 세상에 오신것을 환영합니다.</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
