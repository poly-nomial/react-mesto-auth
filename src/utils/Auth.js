export const base_url = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${base_url}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            email,
        })})
            .then(res => {
                try {
                    return res.json();
                } catch(err) {
                    return err;
                }
                
            })
            .catch(res => Promise.reject(`Ошибка: ${res.status}`))
}