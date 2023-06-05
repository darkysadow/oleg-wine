import React from "react";
import s from './StoreScreen.module.scss';
import Buttons from "../Buttons/Buttons";
import StoreItem from "./StoreItem/StoreItem";
import withRouter from "../HOC/withRouter/withRouter";
import { useNavigate } from "react-router-dom";
import { getGoods } from "../../redux/goods-selectors";
import { useEffect } from "react";
import { getGoodsFromFB } from "../../redux/goods-reducer";
import { connect } from "react-redux";

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

    useEffect(() => {
        props.getGoodsFromFB()
    }, [])

    const goodCategory = props.router.params.goodCategory;
    const cyrGoodCategory = () => {
        if (goodCategory === 'wine') {
            return 'вино'
        } else if (goodCategory === 'grape') {
            return 'виноград'
        } else if (goodCategory === 'dwellers') {
            return 'живці'
        }
    }
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
                    {props.items && props.items.map(item => item.category === cyrGoodCategory() && <StoreItem key={item.id} item={item} />)}
                </div>
            </div>
            <Buttons propArr={buttonsProps} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        items: getGoods(state),
    }
}

export default connect(mapStateToProps, {getGoodsFromFB})(withRouter(StoreScreen));