import React from "react";
import s from './StoreItem.module.scss';
import wine from './../../../img/wine.png';
import grape from './../../../img/grape.png';
import dweller from './../../../img/dweller.png';

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
    return (
        <div className={s.storeItem}>
            <div className={s.storeItemImage}>
                {props.item.category === 'wine' && <img src={wine} alt="" />}
                {props.item.category === 'grape' && <img src={grape} alt="" />}
                {props.item.category === 'dweller' && <img src={dweller} alt="" />}
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

export default StoreItem;