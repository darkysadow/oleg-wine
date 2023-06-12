import React, { useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { getAuthUser, getIsAuthUserLoading, getLoginFormFields } from "../../redux/auth-selectors";
import { loginSuccess, logoutSuccess, setLoginFormField } from "../../redux/auth-reducer";
import s from './../Login/Login.module.scss';
import { connect, useDispatch } from "react-redux";
import useFirebaseAuth from "../../utilites/firebase/auth";
import { Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utilites/firebase/firebase";

const LoginTest = (props) => {
    const dispatch = useDispatch();
    const {authUser, isLoading, signOut} = useFirebaseAuth();

    useEffect(() => {
        if(authUser) {
            dispatch(props.loginSuccess(authUser))
        }
        console.log(authUser);
    }, [authUser, dispatch])    

    const onSubmit = async () => {
        try {
            await signInWithEmailAndPassword(auth, props.formFields.loginInput, props.formFields.passwordInput)
        } catch (error) {
            alert(error);
        }
    }

    return (
        !authUser ? 
        <div className="container">
        <div className={`${s.login} adminScreenHeight`}>
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
                    <Button color="secondary" variant="contained" onClick={onSubmit} disabled={/* isDisabled() */ false}>
                        Авторизуватися
                    </Button>}
            </div>
        </div>
    </div>: <Navigate to={'/authTest'} />
    )
}

const mapStateToProps = (state) => {
    return {
        formFields: getLoginFormFields(state),
        reduxAuthUser: getAuthUser(state),
        reduxIsLoading: getIsAuthUserLoading(state),

    }
}


export default connect(mapStateToProps, { loginSuccess, logoutSuccess, setLoginFormField })(LoginTest)