export const getAdminAction = (state) => {
    return state.adminReducer.adminAction;
}

export const formFields = (state) => {
    return state.adminReducer.formFields;
}

export const getAuthUser = (state) => {
    return state.adminReducer.authUser;
}

export const getIsAuthLoading = (state) => {
    return state.adminReducer.isAuthLoading;
}

export const getUpdateGood = (state) => {
    return state.adminReducer.updateGood;
}

export const getIsSubmitting = (state) => {
    return state.adminReducer.isSubmitting;
}