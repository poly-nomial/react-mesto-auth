import React from 'react';
import * as Auth from '../utils/Auth.js';
import InfoToolTip from './InfoToolTip.js';

function Register({isInfoToolTipOpen, handleToolTipClose, openToolTip}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isRegistered, setRegistered] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState('');
 
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        Auth.register(email, password)
            .then(res => {
                if(res.data) {
                    setRegistered(true);
                } else {
                    setRegistered(false);
                    setErrorMessage(res.error);
                }
            })
            .finally(() => {
                openToolTip(true);
            })
                
    }

    return (
        <div className="sign-up">
            <h1 className="sign-up__title">Регистрация</h1>
            <form className="sign-up__form" onSubmit={handleSubmit}>
                <input type='email' id='email' value={email || ''}placeholder="Email" className="sign-up__input sign-up__input_email" minLength='5' required onChange={handleEmailChange} />
                <input type='password' id='password' value={password || ''} placeholder="Пароль" className='sign-up__input sign-up__input_password' minLength='2' required onChange={handlePasswordChange}/>
                <button type='submit' className="sign-up__button hover-opacity">Зарегистрироваться</button>
            </form>
            <a href='/sign-in' className='sign-up__link hover-opacity'>Уже зарегистрированы? Войти</a>
            <InfoToolTip isRegistered={isRegistered} onClose={handleToolTipClose} isOpen={isInfoToolTipOpen} errorMessage={errorMessage}/>
        </div>
    )
}

export default Register;