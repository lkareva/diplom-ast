 import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () =>  {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const changeHandler  = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
           auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return(
        <div className="auth">
            <div className="auth__container">
                <div className="auth__title"><h1>ВХОД</h1></div>
                <div className="auth__input input">
                        <input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Введите email"
                            value={form.email}
                            onChange={changeHandler}
                        />
                </div>
                <div className="auth__input input">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Введите пароль"
                            value={form.password}
                            onChange={changeHandler}
                        />
                </div>
                <button className="auth__btn"
                        onClick={loginHandler}
                        disabled={loading}
                >Войти</button>
            </div>
        </div>
    )
}

export default AuthPage