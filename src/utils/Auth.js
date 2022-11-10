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

export const authorize = (email, password) => {
    return fetch(`${base_url}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            email,
        })
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            return data;
        })
        .catch(res => Promise.reject(`Ошибка: ${res.status}`))
}

export const login = () => {
    return fetch(`${base_url}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
        .catch(res => Promise.reject(`Ошибка: ${res.status}`))
}