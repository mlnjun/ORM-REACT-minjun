// 스토어 구성
import { configureStore } from '@reduxjs/toolkit'

import reducers from './reducers'

// 전역데이터 저장소 구성
const store = configureStore({
  reducer: reducers,
  devTools: true,
})

export default store
