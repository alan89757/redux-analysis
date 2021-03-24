export const SystemLogOne = ({getState, dispatch})=> next => action=> {
  console.log('系统日志1...')
  return next(action);
}

export const SystemLogTwo = ({getState, dispatch})=> next => action=> {
  console.log('系统日志2...')
  return next(action);
}

export const SystemLogThree = ({getState, dispatch})=> next => action=> {
  console.log('系统日志3...')
  return next(action);
}

export const SystemLogFour = ({getState, dispatch})=> next => action=> {
  console.log('系统日志4...')
  return next(action);
}