import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Место.Россия" />
      <Switch>
        <Route path="/sign-up">
          <a className="header__link hover-opacity" href="/sign-in">
            Войти
          </a>
        </Route>
        <Route path="/sign-in">
          <a className="header__link hover-opacity" href="/sign-up">
            Регистрация
          </a>
        </Route>
        <Route exact path="/">
          <p className="header__email">{props.email}</p>
          <a
            className="header__link header__link_exit hover-opacity"
            onClick={signOut}
          >
            Выйти
          </a>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
