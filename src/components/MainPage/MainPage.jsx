import React from "react";
import s from './MainPage.module.scss';
import Buttons from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import SmoothRender from 'react-smooth-render';
import { Helmet } from "react-helmet-async";

const MainPage = () => {
    const navigate = useNavigate();
    const goto = (text) => {
        navigate(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Про нас',
            actionByClick: () => goto("/aboutUs")
        }/* ,
        {
            id: 2,
            title: 'Back',
            actionByClick: () => consoleLog('Назад')
        } */
    ]
    return (<>
    <Helmet>
        <title>Moiseenko wine</title>
        <meta name="description" content="Виноградник Моісеєнка Олега. Україна, Вінницька область, Калинівський район, село Корделівка. " />
        <link rel="canonical" href="/" />
    </Helmet>
    <div className="container">
            <div className={`${s.quoteBlock} screenHeight`}>
                <div className={s.quote}>
                    <h1>Життям слід насолоджуватися як чудовим вином, ковток за ковтком, </h1>  з перепочинком. Навіть краще вино втрачає для нас всяку красу, ми перестаємо його цінувати, коли п’ємо як воду.<br />© Людвіг Фейєрбах
                </div>
            </div>
        </div>
        <Buttons propArr={buttonsProps} /></>);
}

export default MainPage;