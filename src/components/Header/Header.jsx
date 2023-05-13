import React from "react";
import logo from '../../img/logo.png';
import s from './Header.module.scss';
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (<div className="container">
        <nav className={s.navbar}>
            <ul className={s.left}>
                <li><NavLink to='/'>Головна</NavLink></li>
                <li><NavLink to='/aboutUs'>Про нас</NavLink></li>
                <li><NavLink to='/partners'>Партнери</NavLink></li>
            </ul>
            <div className={s.logo}>
                <img src={logo} alt="logo" />
            </div>
            <ul className={s.right}>
                <li><NavLink to='/assortment'>Асортимент</NavLink></li>
                <li><NavLink to='/contacts'>Контакти</NavLink></li>
                <li><NavLink to='/store'>Кошик</NavLink></li>
            </ul>
        </nav>
        
    </div>);
}

export default Header;