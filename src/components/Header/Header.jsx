import React, { useState } from "react";
import logo from '../../img/logo.png';
import s from './Header.module.scss';
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const [isOpened, setIsOpened] = useState('false')
    const toggleIsOpened = () => {
        isOpened ? setIsOpened(false) : setIsOpened(true)
    }
    return (
        <div className={s.header}>
            <div className="container">
                <div className={s.headerBody}>
                    <div className={`${s.headerlogo_adapted} ${s.logo}`}>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className={`${s.headerBurger} ${!isOpened && s.active}`} onClick={toggleIsOpened}>
                        <span></span>
                    </div>
                    <nav className={`${s.navbar} ${!isOpened && s.active}`} onClick={toggleIsOpened}>
                        <ul className={s.left}>
                            <li><NavLink to='/'>Головна</NavLink></li>
                            <li><NavLink to='/aboutUs'>Про нас</NavLink></li>
                            <li><NavLink to='/partners'>Партнери</NavLink></li>
                        </ul>
                        <div className={`${s.headerLogo_main} ${s.logo}`}>
                            <img src={logo} alt="logo" />
                        </div>
                        <ul className={s.right}>
                            <li><NavLink to='/assortment'>Асортимент</NavLink></li>
                            <li><NavLink to='/contacts'>Контакти</NavLink></li>
                            <li><NavLink to='/store'>Кошик</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Header;