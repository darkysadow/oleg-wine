const SET_USER_ACTION = 'SET_USER_ACTION';
const SET_DELETE_ITEM = 'SET_DELETE_ITEM';

const initialState = {
    userAction: undefined,
    itemToDelete: undefined
}

let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ACTION:
            return {
                ...state,
                userAction: action.newValue
            }
        case SET_DELETE_ITEM:
            return {
                ...state,
                itemToDelete: action.newValue
            }
        default:
            return state;
    }
}

export const setUserAction = (newValue) => ({type: SET_USER_ACTION, newValue});
export const setDeleteItem = (newValue) => ({type: SET_DELETE_ITEM, newValue});

export default userReducer;