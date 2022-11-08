import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "../images/logo.svg";

function Header() {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="Логотип Место.Россия" />
            <Switch>
                <Route path='/sign-up'>
                    <a className='header__link hover-opacity' href='/sign-in'>Войти</a>
                </Route>
                <Route path='/sign-in'>
                    <a className='header__link hover-opacity' href='/sign-up'>Регистрация</a>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;