import { combineReducers } from 'redux'

import Auth from './user/reducer'

import Layout from './layout/reducer'

// 리듀서 함수 통합
export default combineReducers({ Auth, Layout })
