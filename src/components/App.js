
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import api from '../utils/Api.js';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {

  const [isEditProfilePopupOpen, toggleEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, toggleAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, toggleEditAvatarPopup] = React.useState(false);
  const [isInfoToolTipOpen, toggleInfoToolTip] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState(null);
  const [currentUser, setUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, toggleLoggedIn] = React.useState(false);

  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setUser(data);
      })
      .then(() => {
        api.getCardsFromServer()
        .then(res => {
          setCards(res);
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err));
      }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAvatarEditClick() {
    toggleEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    toggleEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
      toggleAddPlacePopup(true);
  }

  function openToolTip() {
    toggleInfoToolTip(true);
  }

  function closeAllPopups() {
    toggleEditProfilePopup(false);
    toggleAddPlacePopup(false);
    toggleEditAvatarPopup(false);
    toggleInfoToolTip(false);
    handleCardClick(null);
  }

  function handleUpdateUser(name, description) {
    api.editUserInfo(name, description)
      .then((data) => setUser(data))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups())
  }

  function handleUpdateAvatar(avatarLink) {
    api.updateAvatar(avatarLink)
      .then((data) => setUser(data))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups())
  }

  function handleAddPlaceSubmit(card) {
    api.postNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards])
    })
    .catch(err => console.log(err))
    .finally(() => closeAllPopups())
  }

  function handleLogin() {
    toggleLoggedIn(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Switch>
          <Route path='/sign-up'>
            <Register isInfoToolTipOpen={isInfoToolTipOpen} handleToolTipClose={closeAllPopups} openToolTip={openToolTip}/>
          </Route>
          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} />
          </Route>
          <ProtectedRoute path='/' loggedIn={loggedIn} component={Main} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleAvatarEditClick} onCardClick={handleCardClick} />
          <Route exact path='/'>
            {loggedIn ? <Redirect to='/'  /> 
            : <Redirect to='/sign-up' />}
          </Route>
        </Switch>
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <PopupWithForm name='confirmation' title='Вы уверены?' isOpen={false} onClose={closeAllPopups} buttonText='Да' onSubmit={() => {}}>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;