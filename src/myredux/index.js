
// 创建store, 挂载了getState, dispatch, subscribe
// enhancer中间件执行后的结果，也是个function
export function createStore(reducer, enhancer) {
  // 先执行中间件
  if(enhancer) {  // 中间件先执行
    return enhancer(createStore)(reducer);
  }
  let currentState;  // 当前状态
  let currentListeners = [];  // 存储监听函数
  // 获取当前状态
  function getState() {
    return currentState;
  }
  // 订阅
  function subscribe(listener) {
    currentListeners.push(listener);  // 存储监听函数
    return function() { // 取消监听能够拿到监听函数的引用
      currentListeners = currentListeners.filter((l)=> {
        return l !== listener;
      })
    }
  }
  // 分发, 调用reducer
  function dispatch(action) {
    // 1. 调用reducer
    currentState = reducer(currentState, action);
    // 2. 执行监听函数
    currentListeners.forEach(v=>v());
    // return action;
  }
  dispatch({type: '@@helloworld'});
  return { getState, subscribe, dispatch }
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args)=> {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    const midApi = {
      getState: store.getState(),
      dispatch: (...args)=> dispatch(args)
    }
    const chain = middlewares.map(middleware=> middleware(midApi));  // 这里可以看出中间件需要{getState, dispatch}两个参数
    // 柯里化处理
    dispatch = compose(...chain)(store.dispatch);
    // 最终只是更新dispatch
    return {
      ...store,
      dispatch
    }
  }
}

function compose(...funcs) {
  if(funcs.length === 0) {
    return args=>args;
  }
  if(funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((result, item)=>{
    return (...args)=> {
      return result(item(...args));   // 从左到右（或者从右到左）这里可以设置
    }
  })
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

export function bindActionCreators(creators, dispatch){
  debugger;
  let bound ={}
  Object.keys(creators).forEach(v => {
      let creator = creators[v];
      bound[v] = bindActionCreator(creator, dispatch);
  })
  return bound;
}