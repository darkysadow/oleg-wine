const SET_FORM_FIELD = 'SET_FORM_FIELD'
const SET_IS_SUBMITTING = 'SET_IS_SUBMITTING'
const SET_LOGIN = 'SET_LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const initialState = {
    formFields: {
        loginInput: null,
        passwordInput: null
    },
    isSubmitting: false,
    login: undefined,
    authUser: null,
    isLoading: true
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FORM_FIELD:
            return {
                ...state,
                formFields: {
                    ...state.formFields,
                    [action.field]: action.newValue
                }
            }
        case SET_IS_SUBMITTING:
            return {
                ...state,
                isSubmitting: action.newValue
            }
        case SET_LOGIN:
            return {
                ...state,
                login: action.newValue
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                authUser: action.authUser,
                isLoading: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                authUser: null,
                isLoading: false
            }
        default:
            return state;
    }
}

export const setLoginFormField = (field, newValue) => ({
    type: SET_FORM_FIELD,
    field, newValue
})

export const setIsLoginSubmitting = (newValue) => ({
    type: SET_IS_SUBMITTING,
    newValue
})

export const setLogin = (newValue) => ({
    type: SET_LOGIN,
    newValue
})

export const loginSuccess = (authUser) => ({ type: LOGIN_SUCCESS, authUser});
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export default authReducer;