import React from "react";
import s from './StoreItem.module.scss';
import wine from './../../../img/wine.png';
import grape from './../../../img/grape.png';
import dwellers from './../../../img/dweller.png';
import { connect } from "react-redux";
import { getBasket } from "../../../redux/basket-selectors";
import { addGoodToBasket } from "../../../redux/basket-reducer";

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

    return (
        <div className={s.storeItem} onClick={() => props.addGoodToBasket(props.item.title, generateRandomCount(), props.item.price)}>
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
    );
}

const mapStateToProps = (state) => ({
    basket: getBasket(state)
})

export default connect(mapStateToProps, {addGoodToBasket})(StoreItem);