import React from "react";
import s from './Admin.module.scss';
import as from './AdminItem.module.scss'
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { formFields, getAdminAction, getAuthUser, getIsAuthLoading, getIsSubmitting, getUpdateGood } from "../../redux/admin-selectors";
import { setAdminAction, setUpdateGood, setFormFields, setFormField, setIsSubmitting } from "../../redux/admin-reducer";
import GoodDialog from "./GoodDialog/GoodDialog";
import { useEffect } from "react";
import { getGoodsFromFB, getCategories } from "../../redux/goods-reducer";
import { getGoods, getCategoriesArray } from "../../redux/goods-selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import logo from './../../img/logo.png';
import { deleteGood } from "../../utilites/firebase/firestore";
import { deleteImage } from "../../utilites/firebase/storage";
import useFirebaseAuth from "../../utilites/firebase/auth";
import { logoutSuccess } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utilites/firebase/firebase";
import Preloader from "../common/Preloader/Preloader";

const Admin = (props) => {
    const {authUser, isLoading, signOut} = useFirebaseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            props.getGoodsFromFB();
            props.getCategories();
        }
        if(authUser) {
            fetchData()
        }
        if (!authUser && !isLoading) {
            navigate('/login')
        }
    }, [authUser, isLoading])

    const onClickAdd = () => {
        props.setAdminAction('addGood');
        props.setUpdateGood({});
    }

    const onClickEdit = (item) => {
        props.setAdminAction('editGood');
        props.setUpdateGood(item)
    }

    const onClickDelete = (id, imgBucket) => {
        deleteGood(id);
        deleteImage(imgBucket);
    }

    const onSignOut = () => {
        signOut(auth).then(() => {
            navigate('/login');
            props.logoutSuccess()
        })
    }

    return (<div className='container'>
        <div className={`${s.admin} adminScreenHeight`}>
            {!isLoading ? <>
            <div className={s.adminAddGood}>
                <Button onClick={() => onClickAdd()}>Додати товар</Button>
            </div>
            <div className={s.adminExit}>
                <Button onClick={() => onSignOut()}>Вийти з панелі</Button>
            </div>
            <div className={s.adminBlock}>
                {!props.goods ?
                    <Preloader />
                    :
                    props.goods.map(item => (
                        <div key={item.id} className={as.adminItem}>
                            {item.available === false && <div className={as.unavailable}></div>}
                            <div className={as.adminItemBlur}></div>
                            <div className={as.adminItemImage}>
                                <img src={item.imgURL} alt={item.goodName} />
                            </div>
                            <div className={as.adminItemNameDescription}>
                                <div className={as.adminItemTitle}>{item.goodName}</div>
                                <div className={as.adminItemDescription}>
                                    {item.description}
                                </div>
                            </div>
                            <div className={as.adminItemPriceAvailable}>
                                <div className={as.adminItemPrice}>
                                    {item.price} ₴
                                </div>
                                <div className={as.adminItemAvailable}>
                                    {item.available === 'true' ? 'Доступно' : 'Недоступно'}
                                </div>
                            </div>
                            <div className={as.adminItemControls}>
                                <div className={as.adminItemUpdate} onClick={() => onClickEdit(item)}>
                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#3784ff' }} />
                                </div>
                                <div className={as.adminItemDelete} onClick={() => onClickDelete(item.id, item.imgBucketURL)}>
                                    <FontAwesomeIcon icon={faTrashCan} style={{ color: '#ff3737' }} />
                                </div>
                            </div>
                        </div>
                    ))
                }
                
            </div>
            </> : <>Preloader</>}
        </div>
        <GoodDialog
            edit={props.updateGood}
            showDialog={props.adminAction === 'addGood' || props.adminAction === 'editGood'}
            formFields={props.formFields}
            adminAction={props.adminAction}
            setAdminAction={props.setAdminAction}
            setFormFields={props.setFormFields}
            setFormField={props.setFormField}
            categories={props.categories}
            isSubmitting={props.isSubmitting}
            setIsSubmitting={props.setIsSubmitting}
        />
    </div>)
}

const mapStateToProps = (state) => {
    return {
        adminAction: getAdminAction(state),
        formFields: formFields(state),
        updateGood: getUpdateGood(state),
        authUser: getAuthUser(state),
        isAuthLoading: getIsAuthLoading(state),
        updateGood: getUpdateGood(state),
        goods: getGoods(state),
        categories: getCategoriesArray(state),
        isSubmitting: getIsSubmitting(state)
    }
}

export default connect(mapStateToProps, { logoutSuccess, setIsSubmitting, getCategories, setAdminAction, setUpdateGood, getGoodsFromFB, setFormFields, setFormField })(Admin);