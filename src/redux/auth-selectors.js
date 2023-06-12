export const getAdminIsSubmitting = (state) => {
    return state.authReducer.isSubmitting;
}

export const getLogin = (state) => {
    return state.authReducer.login;
}

export const getLoginFormFields = (state) => {
    return state.authReducer.formFields
}

export const getAuthUser = (state) => {
    return state.authReducer.authUser;
}

export const getIsAuthUserLoading = (state) => {
    return state.authReducer.isLoading;
}