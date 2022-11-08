function Register() {
    return (
        <div className="sign-up">
            <h1 className="sign-up__title">Регистрация</h1>
            <form className="sign-up__form">
                <input type='email' id='email' placeholder="Email" className="sign-up__input sign-up__input_email" minLength='5' required />
                <input type='password' id='password' placeholder="Пароль" className='sign-up__input sign-up__input_password' minLength='2' required />
                <button type='submit' className="sign-up__button hover-opacity">Зарегистрироваться</button>
            </form>
            <a href='/sign-in' className='sign-up__link hover-opacity'>Уже зарегистрированы? Войти</a>
        </div>
    )
}

export default Register;