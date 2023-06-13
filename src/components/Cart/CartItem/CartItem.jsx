import React from "react";
import s from './CartItem.module.scss';
import wine from './../../../img/wine.png';
import grape from './../../../img/grape.png';
import dwellers from './../../../img/dweller.png';
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

const CartItem = (props) => {
    const deleteItem = (id) => {
        props.setDeleteItem(id)
        props.setUserAction('delete')
    }
    const handleChange = (e) => {
        const inputValue = e.target.value;
        
        // Виконуємо валідацію введеного значення
        if (/^\d*$/.test(inputValue) && 1001 > parseInt(inputValue) > 0) {
            props.updateGoodCount(props.title, inputValue)
        }
      };

    const handleIncrement = () => {
        if (/^\d*$/.test(parseInt(props.count)) && 1000 > parseInt(props.count) > 0) {
            const newValue = parseInt(props.count) + 1
            props.updateGoodCount(props.id, newValue)
        }
    }

    const handleDecrement = () => {
        if (/^\d*$/.test(parseInt(props.count) - 2) && 1000 > parseInt(props.count - 1) > 0 ) {
            const newValue = parseInt(props.count) - 1
            props.updateGoodCount(props.id, newValue)
        }
    }
    return (
        <div className={s.cartItem}>
            <div className={s.cartItemImage}>
                <img src={props.image} alt={props.title} />
            </div>
            <div className={s.cartItemNameCount}>
                <div className={s.cartItemName}>
                    {props.title}
                </div>
                <div className={s.cartItemCount}>
                    <input type="number" min='1' max='1000' value={props.count} onChange={(e) => handleChange(e)} />
                    <button onClick={handleIncrement} className={s.cartItemCountIncrement}>+</button>
                    <button onClick={handleDecrement} className={s.cartItemCountDecrement}>-</button>
                </div>
            </div>
            <div className={s.cartItemPriceSumm}>
                <div className={s.cartItemPrice}>
                    Ціна: {props.price + " грн/" + props.checkNominal(props.category)} 
                </div>
                <div className={s.cartItemSumm}>
                    Сума: {props.price * props.count} грн
                </div>
            </div>
            <div className={s.cartItemDelete} onClick={() => {deleteItem(props.id);}}>
                +
            </div>
            <Dialog open={props.userAction === 'delete'}
                onClose={() => {props.setUserAction(undefined); props.setDeleteItem(undefined)}}>
                <DialogContent>
                    Ви дійсно бажаєте видалити товар з кошику?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.setUserAction(undefined)}>
                        Ні
                    </Button>
                    <Button onClick={() => {
                        props.deleteGoodFromCart(props.itemToDelete);
                        props.setDeleteItem(undefined);
                        props.setUserAction(undefined)
                        }}>
                        Так
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CartItem;