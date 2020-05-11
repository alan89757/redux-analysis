

const TEMP_CHANGE = 'temp change'

// reducer
export function tempChange(state="", action) {
    switch (action.type) {
        case TEMP_CHANGE:
            return action.data
        default:
            return state;
    }
}

// action creator
export function tempCHANGE(data) {
    return {
        type: TEMP_CHANGE,
        data
    }
}

export function tempCHANGEAsync(data) {
    // 相当于在发请求。
    return callback => {
        setTimeout(() => {
            callback(tempCHANGE(data));
        }, 2000)
    }
}