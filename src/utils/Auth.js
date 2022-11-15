export const base_url = "https://auth.nomoreparties.co";

export const register = (email, password) => {
  return fetch(`${base_url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res;
      } else {
        return Promise.reject(res.error);
      }
    });
};

export const login = (email, password) => {
  return fetch(`${base_url}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => getResponseData(res));
};

export const authorize = (token) => {
  return fetch(`${base_url}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => getResponseData(res));
};

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  } else {
    return res.json();
  }
};
