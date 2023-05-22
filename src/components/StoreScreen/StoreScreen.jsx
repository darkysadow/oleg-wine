import React from "react";
import s from './StoreScreen.module.scss';
import Buttons from "../Buttons/Buttons";
import StoreItem from "./StoreItem/StoreItem";
import withRouter from "../HOC/withRouter/withRouter";
import { useNavigate } from "react-router-dom";

const StoreScreen = (props) => {
    const navigate = useNavigate();
    const goto = (text) => {
        navigate(text)
    }
    const buttonsProps = [
        {
            id: 1,
            title: 'Back',
            actionByClick: () => goto(-1)
        }
    ]

    const items = [
        {
            id: 1,
            title: "Червоне з шовковиці",
            category: 'wine',
            price: 280,
            description: 'Луче вино'
        },
        {
            id: 2,
            title: "Біле з черешні",
            category: 'wine',
            price: 280,
            description: 'Луче вино'
        },
        {
            id: 3,
            title: "Біле з аличі",
            category: 'wine',
            price: 280,
            description: 'Луче вино'
        },
        {
            id: 4,
            title: "Червоне з черешні",
            category: 'wine',
            price: 280,
            description: 'Луче вино'
        },
        {
            id: 5,
            title: "Біле Аркадія",
            category: 'wine',
            price: 280,
            description: 'Луче вино'
        },
        {
            id: 6,
            title: "Червоне Вікторія",
            category: 'wine',
            price: 280,
            description: 'Луче вино'
        },
        {
            id: 7,
            title: "Червоне Юпітер",
            category: 'wine',
            price: 280,
            description: 'Луче вино'
        },
        {
            id: 8,
            title: "Рожеве",
            category: 'wine',
            price: 280,
            description: 'Луче вино'
        },
        {
            id: 9,
            title: "Червоне із смородини",
            category: 'wine',
            price: 280,
            description: 'Луче вино'
        },
        {
            id: 10,
            title: "Преображення",
            category: 'grape',
            price: 130,
            description: 'Вкусний виноград'
        },
        {
            id: 11,
            title: "Вікторія",
            category: 'dwellers',
            price: 30,
            description: 'Їбейший живець'
        }
    ]

    const goodCategory = props.router.params.goodCategory;
    return (
        <div className="container">
            <div className={`${s.store} screenHeight`}>
                <div className={s.storeBlock} onWheel={(e) => {
                    const container = e.currentTarget;
                    const delta = Math.sign(e.deltaY);
                    container.scrollBy({
                        left: delta * 100,
                        behavior: 'auto',
                    });
                }}>
                    {items.map(item => (!goodCategory ? <StoreItem key={item.id} item={item}/> : item.category === goodCategory && <StoreItem key={item.id} item={item}/>))}
                </div>
            </div>
            <Buttons propArr={buttonsProps} />
        </div>
    );
}

export default withRouter(StoreScreen);