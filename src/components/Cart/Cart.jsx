import React from "react";
import s from './Cart.module.scss';
import { connect } from "react-redux";
import { getCart, getOrderForm, getSumm } from "../../redux/cart-selectors";
import { updateGoodCount, deleteGoodFromCart, clearCart, updateUserOrderField, clearUserOrderField, sendOrder } from "../../redux/cart-reducer";
import { setUserAction, setDeleteItem } from "../../redux/user-reducer";
import CartItem from "./CartItem/CartItem";
import { useNavigate } from 'react-router-dom';
import Buttons from "../Buttons/Buttons";
import { getDeleteItem, getUserAction } from "../../redux/user-selectors";
import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';

const Cart = (props) => {
    const navigate = useNavigate();
    const goto = (text) => {
        navigate(text)
    }
    const checkNominal = (category) => {
            if (category === 'вино') {
                return "л"
            } else if (category === "виноград") {
                return "кг"
            } else {
                return "шт"
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

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
          .required("Обов'язкове поле")
          .min(2, "Закоротке значення")
          .max(50, "Задовге значення"),
        phoneNumber: Yup.string()
          .required("Обов'язкове поле")
          .matches(/^(?:\+380|0)\d{9}$/, "Невірний номер телефону"),
        email: Yup.string()
          .email("Невірно введено адресу")
          .required("Обов'язкове поле")
      });

    

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
                        props.cart.map(item => <CartItem key={item.goodId} title={item.goodName} image={item.imgURL} id={item.goodId} count={item.count} category={item.category} price={item.price} userAction={props.userAction} itemToDelete={props.itemToDelete} updateGoodCount={props.updateGoodCount} deleteGoodFromCart={props.deleteGoodFromCart} setUserAction={props.setUserAction} setDeleteItem={props.setDeleteItem} checkNominal={checkNominal} />)}
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
                                <td className={s.placeorderDialogPositionCount}>{item.count + "" + checkNominal(item.category)}</td>
                                <td className={s.placeorderDialogPositionPrice}>{item.price + " грн/" + checkNominal(item.category)}</td>
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
                    <Button onClick={() => { props.setUserAction('orderForm') }}>Замовити</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={props.userAction === "orderForm"}
                onClose={() => props.setUserAction(undefined)}
                className={s.orderForm}>
                <Formik
                    initialValues={props.orderForm}
                    onSubmit={() => props.sendOrder(props.orderForm, props.cart, props.summ, props.setUserAction)}
                    validationSchema={validationSchema}
                    className={s.orderFormFormik}>
                        {({errors, touched, setFieldValue}) => (
                            <Form className={s.orderFormFormikForm}>
                                <DialogContent className={s.orderFormFormikContent}>
                                    <Field name='firstName' as={TextField} placeholder="Ваше ім'я" value={props.orderForm.firstName} onChange={(e) => {props.updateUserOrderField(e.target.name, e.target.value); setFieldValue(e.target.name, e.target.value)}} />
                                    {errors.firstName && touched.firstName && <div className='formErrText'>{errors.firstName}</div>}
                                    <Field name='phoneNumber' as={TextField} placeholder="Номер телефону" value={props.orderForm.phoneNumber} onChange={(e) => {props.updateUserOrderField(e.target.name, e.target.value); setFieldValue(e.target.name, e.target.value)}} />
                                    {errors.phoneNumber && touched.phoneNumber && <div className='formErrText'>{errors.phoneNumber}</div>}
                                    <Field name='email' as={TextField} placeholder="E-mail" value={props.orderForm.email} onChange={(e) => {props.updateUserOrderField(e.target.name, e.target.value); setFieldValue(e.target.name, e.target.value)}}/>
                                    {errors.email && touched.email && <div className='formErrText'>{errors.email}</div>}
                                    <Field name='comment' as={TextField} placeholder="Коментар (необов'язково)" value={props.orderForm.comment} onChange={(e) => {props.updateUserOrderField(e.target.name, e.target.value); setFieldValue(e.target.name, e.target.value)}}/>
                                    {errors.comment && touched.comment && <div className='formErrText'>{errors.comment}</div>}
                                </DialogContent>
                                <DialogActions className={s.orderFormFormikButtons}>
                                    <Button onClick={() => {props.setUserAction(undefined); props.clearUserOrderField()}}>Закрити</Button>
                                    <Button type="submit">Замовити</Button>
                                </DialogActions>
                            </Form>
                        )}
                </Formik>
            </Dialog>
            <Dialog
                open={props.userAction === "orderSuccessfull"}
                onClose={() => props.setUserAction(undefined)}>
                <DialogContent>Замовлення прийняте!</DialogContent>
                <DialogActions>
                    <Button onClick={() => { props.clearCart(); props.setUserAction(undefined) }}>Закрити</Button>
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
        itemToDelete: getDeleteItem(state),
        orderForm: getOrderForm(state)
    }
}

export default connect(mapStateToProps, { sendOrder, clearUserOrderField, updateUserOrderField, updateGoodCount, deleteGoodFromCart, setUserAction, setDeleteItem, clearCart })(Cart);