import React, { useEffect, useState } from "react";
import s from './StoreItem.module.scss';
import dialogStyle from './../ItemDialog/ItemDialog.module.scss';
import wine from './../../../img/wine.png';
import grape from './../../../img/grape.png';
import dwellers from './../../../img/dweller.png';
import { connect } from "react-redux";
import { getCart, getCartGoodsId } from "../../../redux/cart-selectors";
import { addGoodToCart, deleteGoodFromCart } from "../../../redux/cart-reducer";
import { setUserAction, setSelectedItem } from "../../../redux/user-reducer";
import { getSelectedItem, getUserAction } from "../../../redux/user-selectors";
import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";


const StoreItem = (props) => {
    const [spoilerOpened, setSpoilerOpened] = useState(false)
    const [count, setCount] = useState(1)

    const toggleSpoiler = () => {
        spoilerOpened === false ? setSpoilerOpened(true) : setSpoilerOpened(false)
    } 
    const checkNominal = () => {
        if (!props.item.nominal) {
            if (props.item.category === 'wine') {
                return "грн/л"
            } else if (props.item.category === "grape") {
                return "грн/кг"
            } else {
                return "грн/шт"
            }
        }
    }

    const setImage = (item) => {
        if (item.category !== null && item.category !== undefined) {
            if (item.category === 'wine') {
                return wine;
            } else if (item.category === 'grape') {
                return grape;
            } else {
                return dwellers;
            }
        }
        
    }

    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue) && 1001 > parseInt(inputValue) > 0) {
            setCount(inputValue)
        }
      }; 

    return (
        <div className={s.storeItem}>
            <div className={s.storeItemTop}>
                <div className={s.storeItemImage}>
                    {props.item.category === 'wine' && <img src={wine} alt="" />}
                    {props.item.category === 'grape' && <img src={grape} alt="" />}
                    {props.item.category === 'dwellers' && <img src={dwellers} alt="" />}
                </div>
                <div className={s.storeItemInfo}>
                    <p>{props.item.title}</p>
                    <p>
                        {props.item.nominal ? props.item.price + ' ' + props.item.nominal : props.item.price + checkNominal()}
                    </p>
                </div>
            </div>
            <div className={s.storeItemBottom}>
                <div className={s.control}>
                    {props.ids.includes(props.item.title) ?
                        <div className={`${s.controlButton} ${s.deleteButton}`} onClick={() => props.deleteGoodFromCart(props.item.title)}>Видалити з кошику</div> :
                        <div className={`${s.controlButton} ${s.addButton}`} onClick={() => { props.setSelectedItem(props.item); props.setUserAction('selectCount') }}>Додати до кошику</div>}
                </div>
            </div>
            <Dialog
                open={props.selectedItem !== undefined && props.userAction === "selectCount"}
                onClose={() => {props.setSelectedItem(undefined); props.setUserAction(undefined)}}
                component='form'
                className={dialogStyle.dialog}
            >
                <Typography variant="h5" className={dialogStyle.dialogHeader}>
                    Додати до кошика
                </Typography>
                <DialogContent className={dialogStyle.dialogContent}>
                    <div className={dialogStyle.good}>
                        <div className={dialogStyle.nameImage}>
                            <div className={dialogStyle.image}>
                                <img src={props.selectedItem && setImage(props.selectedItem)} />
                            </div>
                            <div className={dialogStyle.name}>
                                {props.selectedItem && props.selectedItem.title}
                            </div>
                        </div>
                        <div className={dialogStyle.description}>
                            <h5  onClick={toggleSpoiler}>Опис <span className={`${spoilerOpened === true ? dialogStyle.active : ''}`}></span></h5>
                            <p className={`${spoilerOpened === true ? dialogStyle.active : ''}`}>{props.selectedItem && props.selectedItem.description}</p>
                        </div>
                        <div className={dialogStyle.buy}>
                            <div className={dialogStyle.calcBlock}>
                                <div className={dialogStyle.count}>
                                    <input type="number" value={count} placeholder="К-ть" min='1' onChange={(e) => handleChange(e)} />
                                </div>
                                <div className={dialogStyle.price}>
                                    {props.selectedItem && props.selectedItem.price + " грн"}
                                </div>
                            </div>
                            <div className={dialogStyle.sum}>
                                Cума: <p>{props.selectedItem && count * parseInt(props.selectedItem.price)} грн.</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {props.setSelectedItem(undefined); props.setUserAction(undefined)}}>Закрити</Button>
                    <Button variant="contained" onClick={() => {props.addGoodToCart(props.selectedItem.title, count, 120, props.selectedItem.category); props.setSelectedItem(undefined); props.setUserAction(undefined)}}>Додати в кошик</Button>
                </DialogActions>
                
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        basket: getCart(state),
        ids: getCartGoodsId(state),
        userAction: getUserAction(state),
        selectedItem: getSelectedItem(state)
    }
}

export default connect(mapStateToProps, { addGoodToCart, deleteGoodFromCart, setUserAction, setSelectedItem })(StoreItem);