import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "./myredux/index";
import { SystemLogOne, SystemLogTwo, SystemLogThree, SystemLogFour } from "./middleware/log";
// import { Provider  } from "react-redux";
import { Provider } from "./react-redux/index";

// import thunk from "redux-thunk";
import { tempChange } from "./redux/index";  // reducer
import App from "./app";

// 中间件从右到左执行
const store = createStore(tempChange, applyMiddleware(SystemLogOne, SystemLogTwo, SystemLogThree, SystemLogFour));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById("app"));