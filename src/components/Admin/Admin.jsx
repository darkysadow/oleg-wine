import React from "react";
import s from './Admin.module.scss';
import as from './AdminItem.module.scss'
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { formFields, getAdminAction, getAuthUser, getIsAuthLoading, getUpdateGood } from "../../redux/admin-selectors";
import { setAdminAction, setUpdateGood, resetFormGood } from "../../redux/admin-reducer";
import GoodDialog from "./GoodDialog/GoodDialog";
import { useEffect } from "react";
import { getGoodsFromFB } from "../../redux/goods-reducer";
import { getGoods } from "../../redux/goods-selectors";

const Admin = (props) => {
    useEffect(() => {
        props.getGoodsFromFB();
    }, [])
    const onClickAdd = () => {
        props.setAdminAction('addGood');
        props.setUpdateGood({});
    }

    const onClickEdit = (good) => {
        props.setAdminAction('editGood');
        props.setUpdateGood(good);
    }

    return (<div className='container'>
        <div className={`${s.admin} adminScreenHeight`}>
            <div className={s.adminAddGood}>
                <Button onClick={() => onClickAdd()}>Додати товар</Button>
            </div>
            <div className={s.adminBlock}>
                {!props.goods ?
                    <div>PRELOADER</div> :
                    props.goods.map(item => <div key={item.id} className={s.adminItem}>
                        <div className={as.adminItemTitle}>{item.goodName}</div>
                        <div className={as.adminItemDescription}>{item.description}</div>
                    </div>)
                }
            </div>
        </div>
        <GoodDialog
            edit={props.updateGood}
            formFields={props.formFields}
            resetFormGood={props.resetFormGood}
            adminAction={props.adminAction}
            setAdminAction={props.setAdminAction}
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
        goods: getGoods(state)
    }
}

export default connect(mapStateToProps, { setAdminAction, setUpdateGood, resetFormGood, getGoodsFromFB })(Admin);