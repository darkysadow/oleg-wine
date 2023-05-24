export const getUserAction = (state) => {
    return state.userReducer.userAction;
}

export const getDeleteItem = (state) => {
    return state.userReducer.itemToDelete;
}