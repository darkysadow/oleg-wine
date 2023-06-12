import React from "react";
import logo from './../../../img/logo.png';
import s from './Preloader.module.scss';

const Preloader = (props) => {
    return (
        <div className={s.preloader}>
            <div className={s.preloaderBody}>
                <div className={s.preloaderImg}>
                    <img src={logo} alt="preloader" />
                </div>
                <div className={s.preloaderCircle}>

                </div>
            </div>
        </div>
    );
}

export default Preloader;