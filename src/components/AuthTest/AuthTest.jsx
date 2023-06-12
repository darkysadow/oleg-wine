import { Button } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { getGoodsFromFB, getCategories } from "../../redux/goods-reducer";
import s from './../Admin/Admin.module.scss';
import { useEffect } from "react";
import useFirebaseAuth from "../../utilites/firebase/auth";
import { auth } from "../../utilites/firebase/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../redux/auth-reducer";

const AuthTest = (props) => {
    const {authUser, isLoading, signOut} = useFirebaseAuth();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            props.getGoodsFromFB();
            props.getCategories();
        }
        if(authUser) {
            fetchData()
        }
        if (!authUser && !isLoading) {
            navigate('/loginTest')
        }
    }, [authUser, isLoading])
    const onSignOut = () => {
        debugger
        signOut(auth).then(() => {
            debugger
            navigate('/loginTest');
            props.logoutSuccess()
        })
    }
    return(
    !isLoading ?
        <>Preloader</> :
        <div className="container">
            <div className={`${s.adminBlock} screenHeight`}>
                <p>Admin Test Page</p>
                <Button onClick={() => onSignOut()}>LOGOUT</Button>
            </div>
            
        </div>)
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, { getGoodsFromFB, getCategories, logoutSuccess })(AuthTest)