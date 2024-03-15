import PropTypes from 'prop-types';
import '../assets/styles/ModalPay.css';

import logo from '../assets/img/logo.png';

import imgVisa from '../assets/img/visa.png';
import imgMastercard from '../assets/img/mastercard.png';
import imgAmex from '../assets/img/amex.png';
import { useEffect, useState } from 'react';


export default function ModalPay({ setModalOpen }) {
    const [tomorrow, setTomorrow] = useState('');

    useEffect(() => {
        const getCurrentDate = () => {
            const tomorrowDate = new Date();
            tomorrowDate.setDate(tomorrowDate.getDate() + 1);

            const year = tomorrowDate.getFullYear();
            let month = tomorrowDate.getMonth() + 1;
            let day = tomorrowDate.getDate();

            // Asegurarse de que el mes y el día tienen dos dígitos
            month = month < 10 ? `0${month}` : month;
            day = day < 10 ? `0${day}` : day;

            setTomorrow(`${year}-${month}-${day}`);
        }

        getCurrentDate();
    })

    return (
        <div className="modal-container">
            <div className="modal-overlay">
                <section className="modal">
                    <header className="modal-header">
                        <img
                            src={logo}
                            alt="Image Logo"
                            width={150}
                            height="auto"
                        />
                        <button
                            className='button-close'
                            onClick={() => setModalOpen(false)}
                        >
                            Close <span className="">X</span>
                        </button>
                    </header>

                    <div className="modal-content">
                        <div className='modal-content-layout container'>
                            <figure className='credit-card-logos'>
                                <img src={imgVisa} alt="logo Visa" />
                                <img src={imgMastercard} alt="Logo Mastercard" />
                                <img src={imgAmex} alt="Logo American Express" />
                            </figure>

                            <form className='credit-card-form'>
                                <div className='input-container'>
                                    <label htmlFor="credit-number" className='label'>Credit Card Number:</label>
                                    <input
                                        type="text"
                                        id="credit-number"
                                        name="credit-number"
                                        className="input"
                                        placeholder='xxxx xxxx xxx xxxx'
                                        minLength={16}
                                        maxLength={16}
                                        required
                                    />
                                </div>

                                <div className='input-container'>
                                    <label htmlFor="name" className='label'>Owner&apos;s name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="input"
                                        placeholder='Your Name'
                                    />
                                </div>

                                <div className='input-container'>
                                    <label htmlFor="date" className='label'>Due Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        className="input"
                                        min={tomorrow}
                                    />
                                </div>

                                <div className='input-container'>
                                    <label htmlFor="credit-number" className='label'>Security Code:</label>
                                    <input
                                        type="password"
                                        id="name"
                                        name="name"
                                        className="input"
                                        placeholder='xxx'
                                        minLength={3}
                                        maxLength={3}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

ModalPay.propTypes = {
    setModalOpen: PropTypes.func.isRequired
};

