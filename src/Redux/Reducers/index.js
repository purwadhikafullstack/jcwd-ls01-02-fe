import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

const middlewares = [thunk];
const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
