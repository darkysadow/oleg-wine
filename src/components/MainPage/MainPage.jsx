import React from "react";
import s from './MainPage.module.scss';
import Buttons from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import SmoothRender from 'react-smooth-render';

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
    <div className="container">
            <div className={`${s.quoteBlock} screenHeight`}>
                <div className={s.quote}>
                    Життям слід насолоджуватися як чудовим вином, ковток за ковтком, з перепочинком. Навіть краще вино втрачає для нас всяку красу, ми перестаємо його цінувати, коли п’ємо як воду.<br />© Людвіг Фейєрбах
                </div>
            </div>
        </div>
        <Buttons propArr={buttonsProps} /></>);
}

export default MainPage;