import React from "react";
import s from './Cart.module.scss';
import { connect } from "react-redux";
import { getCart, getSumm } from "../../redux/cart-selectors";
import { updateGoodCount, deleteGoodFromCart } from "../../redux/cart-reducer";
import { setUserAction } from "../../redux/user-reducer";
import CartItem from "./CartItem/CartItem";
import {useNavigate} from 'react-router-dom';
import Buttons from "../Buttons/Buttons";
import { getUserAction } from "../../redux/user-selectors";


const Cart = (props) => {
    const navigate = useNavigate();
    const goto = (text) => {
        navigate(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Back',
            actionByClick: () => goto(-1)
        }
    ]
    return (
        <div className='container'>
            <div className={`${s.cart} screenHeight`}>
                {props.cart.length !== 0 &&
                <div className={s.cartSumm}>
                    Сума: {props.summ} грн
                </div>}
                <div className={props.cart.length === 0 ? `${s.cartBlockEmpty}` : `${s.cartBlock}`} 
                    onWheel={(e) => {
                    const container = e.currentTarget;
                    const delta = Math.sign(e.deltaY);
                    container.scrollBy({
                        left: delta * 100,
                        behavior: 'auto',
                    });
                }}>
                    {props.cart.length === 0 ? 
                        <div className={s.emptyLabel}>В кошику немає жодного товару</div> : 
                        props.cart.map(item => <CartItem key={item.goodid} title={item.goodId} count={item.count} category={item.category} price={item.price} userAction={props.userAction} updateGoodCount={props.updateGoodCount} deleteGoodFromCart={props.deleteGoodFromCart} setUserAction={props.setUserAction} />)}
                </div> 
            </div>
            <Buttons propArr={buttonsProps} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: getCart(state),
        summ: getSumm(state),
        userAction: getUserAction(state)
    }
}

export default connect(mapStateToProps, {updateGoodCount, deleteGoodFromCart, setUserAction})(Cart);