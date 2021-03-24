
const TEMP_CHANGE = 'tempChange';

// reducer， 返回state数据
export function tempChange(state="", action) {
  switch (action.type) {
    case TEMP_CHANGE:
      return action.data;
    default:
      return state;
  }
}

// action
export function tempChangeAction(data) {
  return {
    type: TEMP_CHANGE,
    data
  }
}

