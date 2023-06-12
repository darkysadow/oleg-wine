import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../utilites/firebase/firebase";
import { getDownloadURL } from "../utilites/firebase/storage";

//CONSTS
const SET_SELECTED_GOOD = 'SET_SELECTED_GOOD';
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_GOODS = 'SET_GOODS';
const SET_CATEGORIES = 'SET_CATEGORIES'; 

const initialState = {
    selectedGood: undefined,
    isLoadingGoods: true,
    goods: undefined,
    categories: undefined,
}

const goodsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SELECTED_GOOD:
            return {
                ...state,
                selectedGood: action.goodId
            }
        case SET_GOODS:
            return {
                ...state,
                goods: action.goods
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoadingGoods: action.newValue
            }
        default:
            return state;
    }
}

export const setSelectedGood = (goodId) => ({type: SET_SELECTED_GOOD, goodId});
const setGoods = (goods) => ({type: SET_GOODS, goods});
export const setCategories = (categories) => ({type: SET_CATEGORIES, categories});
const setIsLoadingGoods = (newValue) => ({type: SET_IS_LOADING, newValue});

/* export const getGoodsFromFB = () => (dispatch) => {
    getAllGoods().then(data => {
        dispatch(setGoods(data))
    })
} */
/* export const getGoodsFromFB = () => async (dispatch) => {
    try {
      const snapshot = await getDocs(collection(db, 'goods'));
      let goods = [];
      snapshot.forEach((doc) => {
        goods.push({
          ...doc.data(),
          id: doc.id
        });
      });
      dispatch(setGoods(goods));
    } catch (error) {
      console.log(error);
    }
  }; */
  export const getGoodsFromFB = () => async (dispatch) => {
    const q = query(collection(db, 'goods'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
        let goods = [];
        for (const documentSnapshot of snapshot.docs) {
            const good = documentSnapshot.data();
            goods.push({
                ...good,
                id: documentSnapshot.id,
                imgURL: await getDownloadURL(good.imgBucketURL)
            })
        }
        dispatch(setGoods(goods))
    })
    return unsubscribe;
}

export const getCategories = () => async (dispatch) => {
    try {
        const docRef = doc(db, 'categories', 'categories');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            dispatch(setCategories(docSnap.data().categories));
        } else {
            console.log('No such document');
    }
    } catch(error) {
        console.log(error);
    }
}

export default goodsReducer;