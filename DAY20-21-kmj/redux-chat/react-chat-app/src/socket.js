//클라이언트 socket.io 객체 참조하기
import { io } from "socket.io-client";

//백엔드 소켓 서버주소 세팅하기
const URL = "http://localhost:3005";

//const URL = process.env.SOCKET_SERVER_URL;

// const URL = process.env.NODE.ENV === "production" ? undefined : "http://localhost:3005"

// 추가적인 객체 속성
// autoConnect : false(socket과 명시적으로 연결), true(자동으로 연결)
export const socket = io(URL, { autoConnect: false });
