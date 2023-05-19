import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import React, { useState } from "react";
import s from './ItemDialog.module.scss';
import image from './../../../img/grape.png';

const ItemDialog = (props) => {
    const [spoilerOpened, setSpoilerOpened] = useState(false)
    const [count, setCount] = useState(1)
    const toggleSpoiler = () => {
        spoilerOpened === false ? setSpoilerOpened(true) : setSpoilerOpened(false)
    }
    const setNewCount = (e) => {
        setCount(e.target.value)
        
    }
    return (
        <Dialog
            open={true}
            component='form'
            className={s.dialog}
        >
            <Typography variant="h5" className={s.dialogHeader}>
                Додати до кошика
            </Typography>
            <DialogContent className={s.dialogContent}>
                <div className={s.good}>
                    <div className={s.nameImage}>
                        <div className={s.image}>
                            <img src={image} alt="IMAGE" />
                        </div>
                        <div className={s.name}>
                            Юпітер
                        </div>
                    </div>
                    <div className={s.description} onClick={toggleSpoiler}>
                        <h5>Опис <span className={`${spoilerOpened === true ? s.active : ''}`}></span></h5>
                        <p className={`${spoilerOpened === true ? s.active : ''}`}>Юпітер - це пізньостиглий сорт винограду з великими, округлими ягодами темно-блакитного кольору. Смакові якості ніжні, з фруктовим ароматом та приємною кислинкою. Цей сорт винограду відрізняється високими врожайністю і стійкістю до хвороб.</p>
                    </div>
                    <div className={s.buy}>
                        <div className={s.calcBlock}>
                            <div className={s.count}>
                                <input type="number" value={count} placeholder="К-ть" min='1' onChange={setNewCount} />
                            </div>
                            <div className={s.price}>
                                120 грн/кг
                            </div>
                        </div>
                        <div className={s.sum}>
                            Cума: <p>{count * 120} грн.</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => console.log('Close the Dialog')}>Закрити</Button>
                <Button variant="contained" onClick={() => console.log('Send to cart')}>Додати в кошик</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ItemDialog;