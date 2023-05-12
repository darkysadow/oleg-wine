import React from "react";
import s from './MainPage.module.scss';
import Buttons from "../Buttons/Buttons";

const MainPage = () => {
    const consoleLog = (text) => {
        console.log(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Про нас',
            actionByClick: () => consoleLog("Перехід на Про нас")
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
        <Buttons propArr={buttonsProps} />
    </>);
}

export default MainPage;