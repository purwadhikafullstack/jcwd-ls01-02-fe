import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
});

const middlewares = [thunk];
export const store = createStore(reducers, applyMiddleware(...middlewares));
