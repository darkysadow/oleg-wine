import React from "react";
import s from './Assortment.module.scss';
import wine from './../../img/wine.png';
import grape from './../../img/grape.png';
import dweller from './../../img/dweller.png';
import Buttons from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Assortment = () => {
    const navigate = useNavigate();
    const goto = (text) => {
        navigate(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Наші партнери',
            actionByClick: () => goto("/partners")
        },
        {
            id: 2,
            title: 'Back',
            actionByClick: () => goto('/aboutUs')
        }
    ]
    return (<>
        <Helmet>
            <title>Асортимент</title>
            <meta name="description" content="Асортимент товару виноградаря Олега Моісеєнка." />
            <link rel="canonical" href="/assortment" />
        </Helmet>
        <div className="container">
            <div className={`${s.assortment} screenHeight`}>
                <div className={s.assortmentBlock}>
                    <div className={`${s.wine} ${s.card}`} onClick={() => goto('/store/wine')}>
                        <img src={wine} alt="ВИНО" />
                        <p>вино</p>
                    </div>
                    <div className={`${s.grape} ${s.card}`} onClick={() => goto('/store/grape')}>
                        <img src={grape} alt="ВИНОГРАД" />
                        <p>виноград</p>
                    </div>
                    <div className={`${s.dweller} ${s.card}`} onClick={() => goto('/store/dwellers')}>
                        <img src={dweller} alt="ЖИВЦІ" />
                        <p>живці</p>
                    </div>
                </div>
            </div>
            <Buttons propArr={buttonsProps} />
        </div>

    </>);

}

export default Assortment;