import React from "react";
import s from './Buttons.module.scss';

const Buttons = (props) => {
    return (
        <div className="container">
            <div className={s.buttons}>
                {props.propArr && props.propArr.map(button => (
                    button.title !== "Back" 
                    ? <div key={button.id} className={s.button} onClick={button.actionByClick}><p>{button.title}</p></div>
                    : <div key={button.id} className={s.backButton} onClick={button.actionByClick}></div>
                ))}
            </div>
        </div>)
}

export default Buttons;