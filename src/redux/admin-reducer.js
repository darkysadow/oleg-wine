import { formFields } from "./admin-selectors";

//Consts
const SET_ADMIN_ACTION = 'SET_ADMIN_ACTION';
const SET_AUTH_STATUS = "SET_AUTH_STATUS";
const SET_IS_AUTH_LOADING = 'SET_IS_AUTH_LOADING';
const SET_DELETEGOOD = 'SET_DELETE_GOOD';
const SET_FORM_FIELDS = 'SET_FORM_FIELDS';
const SET_FORM_FIELD = 'SET_FORM_FIELD';
const RESET_FORM_GOOD = 'RESET_FORM_GOOD';
const SET_UPDATEGOOD = "SET_UPDATEGOOD";

const initialState = {
    adminAction: undefined,
    authUser: undefined,
    isAuthLoading: false,
    updateGood: {},
    formFields: {
      available: null,
      goodName: "",
      description: "",
      category: "Оберіть категорію",
      fileName: "Файл не обрано!",
      file: null,
      imageBucketURL: "",
      imageURL: "",
      price: undefined,
    },
    deleteGood: {
        id: undefined,
        imgBucket: undefined
    },
    
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_STATUS:
            return {
                ...state,
                authUser: action.authStatus
            }
        case SET_IS_AUTH_LOADING:
            return {
                ...state,
                isAuthLoading: action.isAuthLoading
            }
        case SET_ADMIN_ACTION:
            return {
                ...state,
                adminAction: action.adminAction
            }
        case SET_DELETEGOOD:
            return {
                ...state,
                deleteGood: {
                    id: action.id,
                    imgBucket: action.imgBucket
                }
            }
        case SET_FORM_FIELDS:
            return {
                ...state,
                formFields: {
                    available: action.available,
                    goodName: action.goodName,
                    description: action.description,
                    category: action.category,
                    fileName: action.fileName,
                    file: action.file,
                    imgBucketURL: action.imgBucketURL,
                    imgURL: action.imgBucket,
                    price: action.price,
                }
            }
        case RESET_FORM_GOOD:
            return {
                ...state,
                formFields: {
                    available: null,
                    goodName: "",
                    description: "",
                    category: "Оберіть категорію",
                    fileName: "Файл не обрано!",
                    file: null,
                    imageBucketURL: "",
                    imageURL: "",
                    price: undefined
                }
            }
        case SET_UPDATEGOOD:
            return {
                ...state,
                updateGood: action.newValue
            }
        case SET_FORM_FIELD:
            return {
                ...state,
                formFields: {
                    ...state.formFields,
                    [action.field]: action.newValue
                }
            }
        default:
            return state;
    }
}

export const setAuthStatus = (authStatus) => ({ type: SET_AUTH_STATUS, authStatus});
export const setIsLoading = (isAuthLoading) => ({type: SET_IS_AUTH_LOADING, isAuthLoading});
export const setAdminAction = (adminAction) => ({type: SET_ADMIN_ACTION, adminAction});
export const setFormFields = (available, goodName, description, category, fileName, file, imgBucketURL, imgURL, price) => ({type: SET_FORM_FIELDS, available, goodName, description, category, fileName, file, imgBucketURL, imgURL, price});
export const setFormField = (field, newValue) => ({type: SET_FORM_FIELD, field, newValue})
export const setDeleteGood = (id, imgBucket) => ({type: SET_DELETEGOOD, id, imgBucket});
export const resetFormGood = () => ({type: RESET_FORM_GOOD});
export const setUpdateGood = (newValue) => ({type: SET_UPDATEGOOD, newValue});

export default adminReducer;