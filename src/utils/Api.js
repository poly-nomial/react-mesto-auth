export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._cohort = "cohort-50";
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getCardsFromServer() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  editUserInfo(newUserName, newUserDescription) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newUserName,
        about: newUserDescription,
      }),
    }).then((res) => this._getResponseData(res));
  }

  postNewCard(newCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(
        `https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}/likes`,
        {
          method: "DELETE",
          headers: this._headers,
        }
      ).then((res) => this._getResponseData(res));
    } else {
      return fetch(
        `https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}/likes`,
        {
          method: "PUT",
          headers: this._headers,
        }
      ).then((res) => this._getResponseData(res));
    }
  }

  updateAvatar(newAvatarLink) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: newAvatarLink,
        }),
      }
    ).then((res) => this._getResponseData(res));
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  }
}

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/",
  headers: {
    authorization: "85ece6ec-ad42-4595-ab64-f4ab4791389f",
    "Content-Type": "application/json",
  },
});

export default api;
