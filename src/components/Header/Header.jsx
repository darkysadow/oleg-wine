import React from "react";
import logo from '../../img/logo.png';
import s from './Header.module.scss';

const Header = () => {
    return (<div className="container">
        <nav className={s.navbar}>
            <ul className={s.left}>
                <li className={s.active}>Головна</li>
                <li>Про нас</li>
                <li>Партнери</li>
            </ul>
            <div className={s.logo}>
                <img src={logo} alt="logo" />
            </div>
            <ul className={s.right}>
                <li>Асортимент</li>
                <li>Контакти</li>
                <li>Кошик</li>
            </ul>
        </nav>
        
    </div>);
}

export default Header;