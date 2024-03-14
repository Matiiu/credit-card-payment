import PropTypes from 'prop-types';
import '../assets/styles/ModalPay.css';

import logo from '../assets/img/logo.png';

import imgVisa from '../assets/img/visa.png';
import imgMastercard from '../assets/img/mastercard.png';
import imgAmex from '../assets/img/amex.png';


export default function ModalPay({ setModalOpen }) {
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
                        <figure className='credit-card-logos'>
                            <img src={imgVisa} alt="logo Visa" />
                            <img src={imgMastercard} alt="Logo Mastercard" />
                            <img src={imgAmex} alt="Logo American Express" />
                        </figure>

                        <form className='crdit-card-form'>
                            <div className='input-container'>
                                <input
                                    type="text"
                                    id="credit-number"
                                    name="credit-number"
                                    className="input"
                                    placeholder='xxxx xxxx xxx xxxx'
                                />
                                <label htmlFor="credit-number" className='label'>Credit Card Number:</label>
                            </div>

                            <div className='input-container'>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="input"
                                    placeholder='Your Name'
                                />
                                <label htmlFor="name" className='label'>Owner&apos;s name:</label>
                            </div>

                            <div className='security-info'>
                            <div className='input-container'>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        className="input"
                                    />
                                    <label htmlFor="date" className='label'>Due Date:</label>
                                </div>

                                <div className='input-container'>
                                    <input
                                        type="password"
                                        id="name"
                                        name="name"
                                        className="input"
                                        placeholder='xxx'
                                    />
                                    <label htmlFor="credit-number" className='label'>Security Code:</label>
                            </div>
                            </div> 
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

ModalPay.propTypes = {
    setModalOpen: PropTypes.func.isRequired
};

