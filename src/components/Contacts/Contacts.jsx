import React from "react";
import s from './Contacts.module.scss';
import logo from './../../img/logo.png';
import Buttons from "../Buttons/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const Contacts = () => {
    const consoleLog = (text) => {
        console.log(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Back',
            actionByClick: () => consoleLog('Назад')
        } 
    ]
    return(
        <div className="container">
            <div className={`${s.contacts} screenHeight`}>
                <div className={s.contactsBlock}>
                    <div className={s.contactsBlockTop}>
                        <div className={s.contactsBlockTopLogo}>
                            <img src={logo} alt="" />
                        </div>
                        <div className={s.contactsBlockTopInfo}>
                            <div className={s.phones}>
                                <div className={s.phone}>
                                    <div className={s.phoneName}>Олег Сергійович</div>
                                    <div className={s.phoneNumber}><a href="tel:+380674305909">+380674305909</a></div>
                                </div>
                                <div className={s.phone}>
                                    <div className={s.phoneName}>Світлана Іванівна</div>
                                    <div className={s.phoneNumber}><a href="tel:+380960559690">+380960559690</a></div>
                                </div>
                            </div>
                            <div className={s.links}>
                                <div className={s.linksSocial}>
                                    <div className={s.linksSocialInstagram}>
                                        <a href="https://www.instagram.com/svitlana_ivanivna_ukrainian/">
                                            <FontAwesomeIcon icon={faInstagram} size="2xl" />
                                        </a>
                                    </div>
                                    <div className={s.liksSocialTikTok}>
                                        <a href="https://www.tiktok.com/@oleg.moiseienko?_t=8c1ANnS97SA">
                                            <FontAwesomeIcon icon={faTiktok} size="2xl" />
                                        </a>
                                    </div>
                                    <div className={s.liksSocialFacebook}>
                                        <a href="https://www.facebook.com/profile.php?id=100023326474534">
                                            <FontAwesomeIcon icon={faFacebook} size="2xl" />
                                        </a>
                                    </div>
                                </div>
                                <div className={s.linksAdress}>
                                    <p>Вінницька обл. с.Корделівка</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.contactsBlockBottom}>
                        <iframe className={s.recordMap} title="Де ми знаходимось" src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4171.275684421371!2d28.535593334255886!3d49.52103026529923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDnCsDMxJzE1LjciTiAyOMKwMzInMjEuMCJF!5e0!3m2!1suk!2sua!4v1682761424141!5m2!1suk!2sua" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <Buttons propArr={buttonsProps} />
        </div>
    )
}

export default Contacts;