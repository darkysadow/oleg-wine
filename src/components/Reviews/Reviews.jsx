import React from "react";
import s from './Reviews.module.scss';
import photo from './../../img/review.jpg';
import Buttons from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import SmoothRender from 'react-smooth-render';

const Reviews = () => {
    const navigate = useNavigate();
    const goto = (text) => {
        navigate(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Контакти',
            actionByClick: () => goto("/contacts")
        },
        {
            id: 2,
            title: 'Back',
            actionByClick: () => goto('/partners')
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