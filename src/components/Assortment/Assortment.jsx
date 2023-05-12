import React from "react";
import s from './Assortment.module.scss';
import wine from './../../img/wine.png';
import grape from './../../img/grape.png';
import dweller from './../../img/dweller.png';
import Buttons from "../Buttons/Buttons";

const Assortment = () => {
    const consoleLog = (text) => {
        console.log(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Наші партнери',
            actionByClick: () => consoleLog("Перехід на Наші партнери")
        },
        {
            id: 2,
            title: 'Back',
            actionByClick: () => consoleLog('Назад')
        } 
    ]
    return(
        <div className="container">
            <div className={`${s.assortment} screenHeight`}>
                <div className={s.assortmentBlock}>
                    <div className={`${s.wine} ${s.card}`} onClick={() => console.log('Перехід на каталог вина')}>
                        <img src={wine} alt="ВИНО" />
                        <p>вино</p>
                    </div>
                    <div className={`${s.grape} ${s.card}`} onClick={() => console.log('Перехід на каталог винограду')}>
                        <img src={grape} alt="ВИНОГРАД" />
                        <p>виноград</p>
                    </div>
                    <div className={`${s.dweller} ${s.card}`} onClick={() => console.log('Перехід на каталог живців')}>
                        <img src={dweller} alt="ЖИВЦІ" />
                        <p>живці</p>
                    </div>
                </div>
            </div>
            <Buttons propArr={buttonsProps}/>
        </div>
    );

}

export default Assortment;