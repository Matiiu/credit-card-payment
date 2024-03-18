import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/ModalPay.css';

import logo from '../assets/img/logo.png';
import InfoCard from './InfoCard';
import Summary from './Summary';
import { useDispatch } from 'react-redux';
import { addPayInfo, saveStep } from '../redux/productSlice';
import { validateFields } from '../helpers/validateCardInfo';

import Loader from './Loader';



export default function ModalPay({ setModalOpen }) {
    const [formData, setFormData] = useState({});
    const [step, setStep] = useState(1);
    const [activateErrors, setActivateErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();



    const [error, setError] = useState({});
    const [alertError, setAlertError] = useState('');

    const handleSaveFormData = (formData) => {
        setFormData(formData);
    }
    const handleContinue = () => {
        if (step === 1) {
            const response = validateFields(formData);
            if (response) {
                setActivateErrors(true);
                setAlertError(response);
                return;
            }
            setActivateErrors(false);
            formData.securityId = '';
            // Guardamos la información del pago en nuestro storage global
            dispatch(addPayInfo({ userInfo: formData }))
            // Convertir la información de la tarjeta a cadena JSON
            const cardInfoString = JSON.stringify(formData);
            // Guardar en el storage
            localStorage.setItem('cardInfo', cardInfoString);
        }
        if (step < 3) {
            // Simulamos un loader mientras se valida la tarjeta.
            let nextStep = step + 1;

            // Activar la carga
            setLoading(true);

            // Desactivar la carga después de 1 segundo
            setTimeout(() => {
                setLoading(false);
                localStorage.setItem('step', (nextStep).toString());
                dispatch(saveStep(nextStep))
                setStep(nextStep);
            }, 1000);
        }

    };

    const handleBack = () => {
        if (step > 0) {
            let backStep = step - 1;
            localStorage.setItem('step', (backStep).toString());
            dispatch(saveStep(backStep))
            setStep(backStep);
        }
    }
    

    useEffect(() => {
        // Configura un temporizador para ocultar la alerta después de 3 minutos
        const timer = setTimeout(() => setAlertError(''), 4000);
        // Limpia el temporizador cuando el componente se desmonta o la alerta se cierra manualmente
        return () => clearTimeout(timer);
    }, [alertError]);

    useEffect(() => {
        const storageStep = Number(localStorage.getItem('step')) || 1;
        setStep(storageStep)
        dispatch(saveStep(storageStep))

        const cardInfoString = localStorage.getItem('cardInfo') || '';

        if (cardInfoString) {
            const cardInfoJson = JSON.parse(cardInfoString);
            dispatch(addPayInfo({ userInfo: cardInfoJson }))
        }
    }, []);

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

                    <div className='modal-content-layout container'>
                        {step === 1
                            ? (<InfoCard
                                setError={setError}
                                error={error}
                                onSaveFormData={handleSaveFormData}
                                activateErrors={activateErrors}
                            />)
                            : (<Summary />)
                        }
                    </div>
                    <footer className='buttons-form'>
                        {step < 3
                            ? (<button
                                className={`button-next ${Object.keys(error).length > 0 ? 'is-error' : ''}`}
                                onClick={handleContinue}
                                disabled={!!Object.keys(error).length}
                            >{step === 1 ? 'Continue' : 'Confirm'}</button>)
                            : (<button className='button-next' onClick={() => setModalOpen(false)}>Close Modal</button>)
                        }
                        {step === 2 && <button className='button-back' onClick={handleBack}>Back</button>}
                    </footer>
                    {alertError && <div className='alert-error'>{alertError}</div>}
                </section>
            </div>
            {loading && <Loader />}
        </div>
    );
}

ModalPay.propTypes = {
    setModalOpen: PropTypes.func.isRequired,
};


