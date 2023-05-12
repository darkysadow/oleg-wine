import React from "react";
import s from './Partners.module.scss';
import winetime from './../../img/winetime.png';
import okwine from './../../img/okwine.png';
import worldwine from './../../img/worldwine.png';
import Buttons from "../Buttons/Buttons";

const Partners = () => {
    const consoleLog = (text) => {
        console.log(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Відгуки про нас',
            actionByClick: () => consoleLog("Перехід на Відгуки")
        },
        {
            id: 2,
            title: 'Back',
            actionByClick: () => consoleLog('Назад')
        } 
    ]
    return (
        <div className="container">
            <div className={`${s.partners} screenHeight`}>
                <div className={s.partnersBlock}>
                    <div className={s.partnersBlockLeft}>
                        <img src={winetime} alt="winetime" />
                    </div>
                    <div className={s.partnersBlockRight}>
                        <img src={okwine} alt="okwine" />
                        <img src={worldwine} alt="worldwine" />
                    </div>
                </div>
            </div>
            <Buttons propArr={buttonsProps} />
        </div>
    );
}

export default Partners;

