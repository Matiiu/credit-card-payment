import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/ModalPay.css';

import logo from '../assets/img/logo.png';
import InfoCard from './InfoCard';
import Summary from './Summary';
import { useDispatch } from 'react-redux';
import { addPayInfo, saveStep } from '../redux/productSlice';

import Loader from './Loader';



export default function ModalPay({ setModalOpen }) {
    const [formData, setFormData] = useState({});
    const errorRef = useRef(null);
    const [step, setStep] = useState(1);
    const [activateErrors, setActivateErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();



    const [error, setError] = useState({});
    const [alertError, setAlertError] = useState('');

    const franchiseMap = {
        3: 'amex',
        4: 'visa',
        5: 'mastercard',
    };

    // const imageSrc = cardImages[franchise] || cardFront;

    const validateDueDate = (expiryDate) => {
        // Validar campo de fecha de expiración
        if (!expiryDate) {
            return 'The field is required'
        }

        // Obtener la fecha actual
        const currentDate = new Date();
        // Obtener el año actual
        const currentYear = currentDate.getFullYear();
        // obtener los ultimos 2 digitos del año
        const shortYear = currentYear % 100;
        // Obtener el mes actual
        const currentMonth = currentDate.getMonth() + 1;
        const inputYear = Number(expiryDate.substring(0, 2));
        const inputmonth = Number(expiryDate.substring(3, 5));

        // Validar si la tarjeta esta expirada
        if (
            inputYear < shortYear ||
            inputYear === shortYear && inputmonth <= currentMonth
        ) {
            return 'Expired card'
        }
        // Validmamos que el año no sea menor a 1 ni mayor a 12
        if (inputmonth < 1 || inputmonth > 12) {
            return '* Invalid month'
        }
    }

    const handleSaveFormData = (formData) => {
        setFormData(formData);
    }

    const handleContinue = () => {
        if (step === 1) {
            const response = validateFieldsClick(formData);
            if (response) {
                setAlertError(response);
                return;
            }
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

    const validateFieldsClick = (data) => {
        const {
            creditCard,
            securityId,
            installments,
            owner,
            expiryDate,
            typeId,
            document,
            address,
        } = data
        // Validamos si alguno de los datos está vacío, si lo está los establecemos en vacío
        // para que entre a la función validateFields y bloquee el botón de continuar
        if (
            !creditCard ||
            !securityId ||
            !installments ||
            !owner ||
            !expiryDate ||
            !typeId ||
            !document ||
            !address
        ) {
            setActivateErrors(true);
            return 'All fields are required';
        }
        setActivateErrors(false);
        const firstLetter = creditCard[0];

        if (creditCard.length < 16 || !(firstLetter in franchiseMap)) {
            return 'The credit card is not valid';
        }

        const dueDate = validateDueDate(expiryDate);
        if (dueDate) {
            return dueDate;
        }
        return ''
    }

    useEffect(() => {
        if (alertError) {
            // Enfocar el error
            errorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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
                    {alertError && <div className='alert-error' ref={errorRef}>{alertError}</div>}
                </section>
            </div>
            {loading && <Loader />}
        </div>
    );
}

ModalPay.propTypes = {
    setModalOpen: PropTypes.func.isRequired,
};


