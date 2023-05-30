import React, {useContext, useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import AddModal from "./UI/Modal/Modal";
import AddDeviceContainer from "./AddDevice/AddDeviceContainer";
import {useUserQuery} from "../hooks/API/user.hook";
import {Loader} from "./UI/Loader";

export const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [modal, setModal] = useState(false)
    const [mobMenu, setMobMenu] = useState(false)
    const user = useUserQuery()
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }
    if (mobMenu){
        document.body.classList.add('lock')
    } else {
        document.body.classList.remove('lock')
    }

    return (
        <>
            <header className={mobMenu ? "header header--is-open": "header"} onClick={() => setMobMenu(false)}>
                <div className="header__container" onClick={(e) => e.stopPropagation()}>
                    <div className="header__top">
                        <div className="header__logo logo">
                            <NavLink to="/" className="logo__img" >
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
                        </div>
                        <nav className="header__nav nav">
                            <ul className="nav__ul">
                                <li className="nav__li"><NavLink to="/" onClick={() => setMobMenu(false)}>
                                    <div className="icon-01"></div>
                                    <span>Панель</span></NavLink>
                                </li>
                                <li className="nav__li"><NavLink to="/section-map-devices" onClick={() => setMobMenu(false)}>
                                    <div className="icon-02"></div>
                                    <span>Омск-Новосибирск</span></NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="header__bottom">
                        <nav className="header__nav nav">
                            <ul className="nav__ul">
                                <li className="nav__li"><NavLink to="/manual" onClick={() => setMobMenu(false)}>
                                    <div className="icon-04"></div>
                                    <span>Справочник</span></NavLink>
                                </li>
                                <li className="nav__li"><a href="/" onClick={logoutHandler}>
                                    <div className="icon-05"></div>
                                    <span>Выйти из системы</span></a>
                                </li>
                            </ul>
                        </nav>

                        {user.isSuccess
                            ? <div className="header__profile profile-header">
                                <div className="profile-header__img"><img src={require('../img/nav/man.jpg')} alt=""/></div>
                                <div className="profile-header__content">
                                    <div className="profile-header__name">{user.data.fullName || "Пользователь"}</div>
                                    <div className="profile-header__email">{user.data.email}</div>
                                </div>
                            </div>
                            : <Loader />
                        }
                    </div>
                </div>
            </header>
            <AddModal visible={modal} setVisible={setModal}>
                <AddDeviceContainer setModal={setModal}/>
            </AddModal>
            <div className="header-mob">
                <div className="header-mob__logo logo">
                    <NavLink to="/" className="logo__img" onClick={() => setMobMenu(false)}>
                        <img src={require('../img/logo.svg')} alt=""/>
                    </NavLink>
                </div>
                <div className="header__burger">
                    <div className={mobMenu ? "burger burger_close" : "burger"} onClick={() => setMobMenu(prev => !prev)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </>
    )
}
