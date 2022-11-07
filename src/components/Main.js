import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main({cards, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const currentUser = React.useContext(CurrentUserContext)
  return (
        <main className="main">
          <section className="profile">
              <div className="avatar button-decor" style={{backgroundImage: `url(${currentUser.avatar})`}}onClick={onEditAvatar}><div className="avatar__edit-pic"></div></div>
              <div className="profile__info">
                  <h1 className="profile__user-name">{currentUser.name}</h1>
                  <button type="button" aria-label="Изменить профиль" className="profile__edit-button button-decor hover-opacity" onClick={onEditProfile}></button>
                  <p className="profile__user-description">{currentUser.about}</p>
              </div>
              <button type="button" aria-label="Добавить фото" className="profile__add-button button-decor hover-opacity" onClick={onAddPlace}></button>
          </section>
          <section className="places">
            {cards.map((card) => (
                <Card key={card._id} card={card} onClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
            ))}
          </section>
      </main>
    )
}

export default Main;