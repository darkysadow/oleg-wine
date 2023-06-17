import React from "react";
import s from './AboutUs.module.scss';
import image from './../../img/aboutUs.jpg';
import Buttons from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import SmoothRender from 'react-smooth-render';
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
    const navigate = useNavigate();
    const goto = (text) => {
        navigate(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Асортимент',
            actionByClick: () => goto("/assortment")
        },
        {
            id: 2,
            title: 'Back',
            actionByClick: () => goto('/')
        }
    ]
    return (<>
    <Helmet>
        <title>Про нас</title>
        <meta name="description" content="Олег Сергійович – виноградар з досвідом більше 10 років. Він присвятив своє життя розвитку та підвищенню якості винограду в Україні." />
        <link rel="canonical" href="/aboutUs" />
    </Helmet>
            <div className="container">
                <div className={`${s.aboutUs} screenHeight`}>
                    <div className={s.aboutUsBlock}>
                        <div className={s.aboutUsLeft}>
                            <h1>Від пагонів до пляшок - ми знаємо все про виноградництво.</h1>
                            <p>
                                Олег Сергійович – виноградар з досвідом більше 10 років. Він присвятив своє життя розвитку та підвищенню якості винограду в Україні. Олег знає кожну лозу своїх виноградників як власні п'ять пальців, а його досвід дозволяє досягати врожаїв високої якості. Завдяки його старанням та вмінням, виноград Олега вважається одним з найкращих у регіоні. Він працює з любов'ю та пристрастю до своєї справи, завжди дбаючи про кожну деталь у процесі вирощування винограду. Якщо ви шукаєте справжнього експерта в галузі виноградництва, Олег Сергійович – саме те, що вам потрібно !
                            </p>
                        </div>
                        <div className={s.aboutUsRight}>
                            <img src={image} alt="" />
                        </div>
                    </div>
                </div>
                <Buttons propArr={buttonsProps} />
            </div>
            </>);
}

export default AboutUs;