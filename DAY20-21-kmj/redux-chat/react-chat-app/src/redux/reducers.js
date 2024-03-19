import { combineReducers } from "redux";

import Auth from "./auth/reducer";
import Layout from "./layout/reducer";
import Chat from "./chat/reducer";

export default combineReducers({
  Auth,
  Layout,
  Chat,
});
