
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { getDownloadURL } from './storage';
import { db } from './firebase';

const CATEGORIES_COLLECTION = 'categories';
const GOODS_COLLECTION = 'goods';

export function addGood( category, goodName, description, price, available, imgBucketURL, imgURL) {
    addDoc(collection(db, GOODS_COLLECTION), { goodName, description, price, available, imgBucketURL, imgURL, category });
  }
  

export async function getCategories (setCategories) {
    const docRef = doc(db, CATEGORIES_COLLECTION, CATEGORIES_COLLECTION);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return setCategories(docSnap.data().categories);
    } else {
        console.log('No such document');
    }
}

export async function getSelectedCategory(category, setGoods) {
    const q = query(collection(db, CATEGORIES_COLLECTION), where('category', 'in', [...category]));
    const querySnapshot = await getDocs(q);
    let goodsArr = [];
    await querySnapshot.forEach((doc) => {
        goodsArr.push(doc.data()) 
    })
    setGoods(goodsArr)
}

export async function getAllGoods() {
    const q = query(collection(db, GOODS_COLLECTION));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
        let goods = [];
        for (const documentSnapshot of snapshot.docs) {
            const good = documentSnapshot.data();
            goods.push({
                ...good,
                id: documentSnapshot.id,
                //imageURL: await getDownloadURL(good.imgBucketURL)
            })
        }
        return goods;
    })
    return unsubscribe;
}

export function updateGood(docId, available, category, description, goodName, imgBucketURL,
    imgURL, price) {
    setDoc(doc(db, GOODS_COLLECTION, docId), { available, category, description, goodName, imgBucketURL, imgURL, price });
  }
  

export function deleteGood(id) {
    deleteDoc(doc(db, GOODS_COLLECTION, id));
  }