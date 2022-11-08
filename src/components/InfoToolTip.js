import React from "react";
import registerCheck from '../images/RegisterCheck.png';
import registerFail from '../images/RegisterFail.png';

function InfoToolTip({isRegistered, onClose, isOpen}) {
    return (
        <div className={`popup info-tool-tip ${isOpen? ('popup_opened') : ('')}`}>
            <div className="popup__container info-tool-tip__container">
                {isRegistered ?
                    <>
                        <img className="info-tool-tip__pic" src={registerCheck} />
                        <h2 className="info-tool-tip__title">Вы успешно зарегистрировались!</h2>
                    </>
                    : <>
                        <img className="info-tool-tip__pic" src={registerFail} />
                        <h2 className="info-tool-tip__title">Что-то пошло не так! Попробуйте еще раз.</h2>
                    </>
                }
                <button type="button" aria-label="Закрыть окно" className="popup__close-btn button-decor hover-opacity" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoToolTip;