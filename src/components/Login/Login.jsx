import React from "react"
import { connect, useDispatch } from "react-redux"
import s from './Login.module.scss'
import { getLoginFormFields } from "../../redux/auth-selectors"
import { setLoginFormField, loginSuccess, setLogin } from "../../redux/auth-reducer"
import { Button, TextField, Typography } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../utilites/firebase/firebase"
import useFirebaseAuth, { useAuth } from "../../utilites/firebase/auth"
import { useEffect } from "react"
import Preloader from "../common/Preloader/Preloader"

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authUser, isLoading, signOut} = useFirebaseAuth();

    useEffect(() => {
        if(authUser) {
            dispatch(props.loginSuccess(authUser))
        }
        if(authUser && !isLoading) {
            navigate('/admin')
        }
    }, [authUser, dispatch])  

    const isDisabled = () => {
        return (!props.formFields.loginInput) || 
        (!props.formFields.passwordInput);
    };
    
    const onSubmit = async () => {
        try {
            await signInWithEmailAndPassword(auth, props.formFields.loginInput, props.formFields.passwordInput)
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="container">
        <div className={`${s.login} adminScreenHeight`}>
            {!isLoading ?
            <div className={s.loginBlock}>
                <Typography variant="h4" className={s.label}>
                    Авторизація
                </Typography>
                <TextField size="small" id="filled-basic" label="Логін" variant="filled" value={!props.formFields.loginInput ? '' : props.formFields.loginInput} onChange={(e) => props.setLoginFormField('loginInput', e.target.value)} />
                <TextField type='password' size="small" id="filled-basic" label="Пароль" variant="filled" value={!props.formFields.passwordInput ? '' : props.formFields.passwordInput} onChange={(e) => props.setLoginFormField('passwordInput', e.target.value)} />
                {props.isSubmitting ?
                    <Button color="secondary" variant="contained" disabled={true}>
                        Авторизація...
                    </Button> :
                    <Button color="secondary" variant="contained" onClick={onSubmit} disabled={isDisabled()}>
                        Авторизуватися
                    </Button>}
            </div>
            : <Preloader />}
        </div>
    </div> 
    )
}

const mapStateToProps = (state) => {
    return {
        formFields: getLoginFormFields(state)
    }
}

export default connect(mapStateToProps, {setLoginFormField, loginSuccess, setLogin})(Login)