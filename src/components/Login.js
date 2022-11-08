function Login() {
    return (
        <div className="sign-up">
            <h1 className="sign-up__title">Вход</h1>
            <form className="sign-up__form">
                <input type='email' id='email' placeholder="Email" className="sign-up__input sign-up__input_email" minLength='5' required />
                <input type='password' id='password' placeholder="Пароль" className='sign-up__input sign-up__input_password' minLength='2' required />
                <button type='submit' className="sign-up__button hover-opacity">Войти</button>
            </form>
        </div>
    )
}

export default Login;