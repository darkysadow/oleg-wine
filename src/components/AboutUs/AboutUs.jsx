import React from "react";
import s from './AboutUs.module.scss';

const AboutUs = () => {
    return (
        <div className="container">
            <div className={s.quoteBlock}>
                <div className={s.quote}>
                    Життям слід насолоджуватися як чудовим вином, ковток за ковтком, з перепочинком. Навіть краще вино втрачає для нас всяку красу, ми перестаємо його цінувати, коли п’ємо як воду.<br />© Людвіг Фейєрбах
                </div>
            </div>
        </div>
    );
}

export default AboutUs;