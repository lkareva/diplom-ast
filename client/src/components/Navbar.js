import React, {useContext, useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import AddModal from "./UI/Modal/Modal";
import AddDeviceContainer from "./AddDevice/AddDeviceContainer";

export const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [modal, setModal] = useState(false)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    return (
        <header className="header">
            <div className="header__top">
                <div className="header__logo logo">
                    <NavLink to="/" className="logo__img">
                        <img src={require('../img/logo.svg')} alt=""/>
                    </NavLink>
                    <NavLink to="/" className="logo__text">
                        <span>Адаптивная</span>
                        <span>Система</span>
                        <span>Токосъема</span>
                    </NavLink>
                </div>
                <div className="header__button">
                    <button className="header__add-section btn btn_bold" onClick={() => setModal(true)}>
                       Добавить устройство диагностики
                    </button>
                    <AddModal visible={modal} setVisible={setModal}>
                        <AddDeviceContainer setModal={setModal}/>
                    </AddModal>
                </div>
                <nav className="header__nav nav">
                    <ul className="nav__ul">
                        <li className="nav__li"><NavLink to="/">
                            <div className="icon-01"></div>
                            <span>Панель</span></NavLink>
                        </li>
                        <li className="nav__li"><NavLink to="/section-map-devices">
                            <div className="icon-02"></div>
                            <span>Омск-Новосибирск</span></NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header__bottom">
                <nav className="header__nav nav">
                    <ul className="nav__ul">
                        <li className="nav__li"><NavLink to="/manual">
                            <div className="icon-04"></div>
                            <span>Справочник</span></NavLink>
                        </li>
                        <li className="nav__li"><a href="/" onClick={logoutHandler}>
                            <div className="icon-05"></div>
                            <span>Выйти из системы</span></a>
                        </li>
                    </ul>
                </nav>

                <div className="header__profile profile-header" onClick={() => navigate('/account')}>
                    <div className="profile-header__img"><img src={require('../img/nav/man.jpg')} alt=""/></div>
                    <div className="profile-header__content">
                        <div className="profile-header__name">Урусова Анастасия</div>
                        <div className="profile-header__email">urusova454@gmail.com</div>
                    </div>

                </div>
            </div>
        </header>
    )
}
