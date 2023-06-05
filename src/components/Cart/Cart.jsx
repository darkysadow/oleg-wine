import React from "react";
import s from './Cart.module.scss';
import { connect } from "react-redux";
import { getCart, getSumm } from "../../redux/cart-selectors";
import { updateGoodCount, deleteGoodFromCart, clearCart } from "../../redux/cart-reducer";
import { setUserAction, setDeleteItem } from "../../redux/user-reducer";
import CartItem from "./CartItem/CartItem";
import {useNavigate} from 'react-router-dom';
import Buttons from "../Buttons/Buttons";
import { getDeleteItem, getUserAction } from "../../redux/user-selectors";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";


const Cart = (props) => {
    const navigate = useNavigate();
    const goto = (text) => {
        navigate(text)
    }
    const checkNominal = (item) => {
        if (!item.nominal) {
            if (item.category === 'wine') {
                return "л"
            } else if (item.category === "grape") {
                return "кг"
            } else {
                return "шт"
            }
        } else {
            return item.nominal
        }
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Back',
            actionByClick: () => goto(-1)
        },
        {
            id: 2,
            title: 'Оформити замовлення',
            actionByClick: () => props.setUserAction('placeorder')
        }
    ]
    return (
        <div className='container'>
            <div className={`${s.cart} screenHeight`}>
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
                        props.cart.map(item => <CartItem key={item.goodId} title={item.goodName} image={item.imgURL} id={item.goodId} count={item.count} category={item.category} price={item.price} userAction={props.userAction} itemToDelete={props.itemToDelete} updateGoodCount={props.updateGoodCount} deleteGoodFromCart={props.deleteGoodFromCart} setUserAction={props.setUserAction} setDeleteItem={props.setDeleteItem} checkNominal={checkNominal}/>)}
                </div> 
            </div>
            {props.cart.length === 0 ? <Buttons propArr={[buttonsProps[0]]} /> : <Buttons propArr={buttonsProps} />}
            <Dialog
                open={props.userAction === "placeorder"}
                onClose={() => props.setUserAction(undefined)}
                className={s.placeorderDialog}>
                    <DialogContent className={s.placeorderDialogBlock}>
                        <table className={s.placeorderDialogTable}>
                            <thead className={s.placeorderDialogPosition}>
                                <tr>
                                    <th>Назва</th>
                                    <th>К-ть</th>
                                    <th>Ціна</th>
                                    <th>Сума</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.cart.map(item => (<tr key={item.goodId} className={s.placeorderDialogPosition}>
                            <td className={s.placeorderDialogPositionTitle}>{item.goodName}</td>
                            <td className={s.placeorderDialogPositionCount}>{item.count + "" + checkNominal(item)}</td>
                            <td className={s.placeorderDialogPositionPrice}>{item.price + " грн/" + checkNominal(item)}</td>
                            <td className={s.placeorderDialogPositionSumm}>{parseInt(item.count * item.price) + " грн"}</td>
                        </tr>))}
                            <tr className={s.placeorderDialogPosition}>
                                <td colSpan='3'>Сума</td>
                                <td>{props.summ + " грн"}</td>
                            </tr>                                    
                            </tbody>
                        </table>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => props.setUserAction(undefined)}>Закрити</Button>
                        <Button onClick={() => {props.setUserAction('orderForm')}}>Замовити</Button>
                    </DialogActions>
            </Dialog>
            <Dialog
                open={props.userAction === "orderForm"}
                onClose={() => props.setUserAction(undefined)}>
                    <DialogContent></DialogContent>
                    <DialogActions>
                        <Button onClick={() => props.setUserAction(undefined)}>Закрити</Button>
                        <Button onClick={() => props.setUserAction('orderSuccessfull')}>Замовити</Button>
                    </DialogActions>
                </Dialog>
            <Dialog
                open={props.userAction === "orderSuccessfull"}
                onClose={() => props.setUserAction(undefined)}>
                    <DialogContent>Замовлення прийняте!</DialogContent>
                    <DialogActions>
                        <Button onClick={() => {props.clearCart(); props.setUserAction(undefined)}}>Закрити</Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: getCart(state),
        summ: getSumm(state),
        userAction: getUserAction(state),
        itemToDelete: getDeleteItem(state)
    }
}

export default connect(mapStateToProps, {updateGoodCount, deleteGoodFromCart, setUserAction, setDeleteItem, clearCart})(Cart);