import React, { useEffect } from "react";
import s from './StoreItem.module.scss';
import wine from './../../../img/wine.png';
import grape from './../../../img/grape.png';
import dwellers from './../../../img/dweller.png';
import { connect } from "react-redux";
import { getBasket, getBasketGoodsId } from "../../../redux/basket-selectors";
import { addGoodToBasket, deleteGoodFromBasket } from "../../../redux/basket-reducer";

const StoreItem = (props) => {
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
    const generateRandomCount = () => {
        return Math.ceil(Math.abs(Math.random() * 10))
    }
    const toggleGoodInCart = () => {
        props.ids.includes(props.item.title) ? 
            props.deleteGoodFromBasket(props.item.title) : 
            props.addGoodToBasket(props.item.title, generateRandomCount(), props.item.price);
    }
    return (
        <div className={s.storeItem} onClick={() => {toggleGoodInCart()}}>
            <div className={s.storeItemImage}>
                {props.item.category === 'wine' && <img src={wine} alt="" />}
                {props.item.category === 'grape' && <img src={grape} alt="" />}
                {props.item.category === 'dwellers' && <img src={dwellers} alt="" />}
            </div>
            <div className={s.storeItemInfo}>
                <div className={s.control}>
                    {props.ids.includes(props.item.title) ? <div className={`${s.controlButton} ${s.deleteButton}`}>Видалити з кошику</div> : <div className={`${s.controlButton} ${s.addButton}`}>Додати до кошику</div>}
                </div>
                <p>{props.item.title}</p>
                <p>
                    {props.item.nominal ? props.item.price + ' ' + props.item.nominal : props.item.price + checkNominal()}
                </p>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        basket: getBasket(state),
        ids: getBasketGoodsId(state)
    }
}

export default connect(mapStateToProps, {addGoodToBasket, deleteGoodFromBasket})(StoreItem);