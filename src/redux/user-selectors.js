export const getUserAction = (state) => {
    return state.userReducer.userAction;
}

export const getDeleteItem = (state) => {
    return state.userReducer.itemToDelete;
}

export const getSelectedItem = (state) => {
    return state.userReducer.selectedItem;
}