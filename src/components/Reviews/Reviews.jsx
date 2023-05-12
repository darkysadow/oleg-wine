import React from "react";
import s from './Reviews.module.scss';
import photo from './../../img/review.jpg';
import Buttons from "../Buttons/Buttons";

const Reviews = () => {
    const consoleLog = (text) => {
        console.log(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Контакти',
            actionByClick: () => consoleLog("Перехід на Контакти")
        },
        {
            id: 2,
            title: 'Back',
            actionByClick: () => consoleLog('Назад')
        } 
    ]
    return(
        <div className="container">
            <div className={`${s.reviews} screenHeight`}>
                <div className={s.reviewsBlock}>
                    <img src={photo} alt="" />
                </div>
            </div>
            <Buttons propArr={buttonsProps} />
        </div>
    );
}

export default Reviews;