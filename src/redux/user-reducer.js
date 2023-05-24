const SET_USER_ACTION = 'SET_USER_ACTION';

const initialState = {
    userAction: undefined
}

let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ACTION:
            return {
                ...state,
                userAction: action.newValue
            }
        default:
            return state;
    }
}

export const setUserAction = (newValue) => ({type: SET_USER_ACTION, newValue});

export default userReducer;