import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/ModalPay.css';

import logo from '../assets/img/logo.png';
import InfoCard from './InfoCard';
import Summary from './Summary';

export default function ModalPay({ setModalOpen, product }) {
    const [franchise, setFranchise] = useState('');
    const [creditCard, setCreditCard] = useState(undefined);
    const [securityId, setSecurityId] = useState(undefined);
    const [installments, setInstallments] = useState(1);
    const [owner, setOwner] = useState(undefined);
    const [expiryDate, setExpiryDate] = useState(undefined);
    const [typeId, setTypeId] = useState(1);
    const [document, setDocument] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const errorRef = useRef(null);
    const [step, setStep] = useState(1);

    const [error, setError] = useState({});
    const [alertError, setAlertError] = useState('');

    const franchiseMap = {
        3: 'amex',
        4: 'visa',
        5: 'mastercard',
    };

    // const imageSrc = cardImages[franchise] || cardFront;

    const validateDueDate = () => {
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

    const handleClick = () => {
        if (step === 1) {
            const response = validateFieldsClick();
            if (response) {
                setAlertError(response);
                return;
            }
        }
        setStep(step + 1);
    }

    const validateFieldsClick = () => {
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
            setCreditCard(creditCard || '');
            setSecurityId(securityId || '');
            setInstallments(installments || 1);
            setOwner(owner || '');
            setExpiryDate(expiryDate || '');
            setTypeId(typeId || 1);
            setDocument(document || '');
            setAddress(address || '');

            return 'All fields are required';
        }
        const firstLetter = creditCard[0];

        if (creditCard.length < 16 || !(firstLetter in franchiseMap)) {
            return 'The credit card is not valid';
        }

        const dueDate = validateDueDate();
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
                                setFranchise={setFranchise}
                                setCreditCard={setCreditCard}
                                setSecurityId={setSecurityId}
                                setInstallments={setInstallments}
                                setOwner={setOwner}
                                setExpiryDate={setExpiryDate}
                                setTypeId={setTypeId}
                                setDocument={setDocument}
                                setAddress={setAddress}
                                setError={setError}
                                franchise={franchise}
                                creditCard={creditCard}
                                securityId={securityId}
                                installments={installments}
                                owner={owner}
                                expiryDate={expiryDate}
                                typeId={typeId}
                                document={document}
                                address={address}
                                error={error}
                            />)
                            : (<Summary
                                product={product}
                                creditCard={creditCard}
                                installments={installments}
                                typeId={typeId}
                                document={document}
                                owner={owner}
                                address={address}
                                step={step}
                            />)
                        }
                    </div>
                    <footer className='buttons-form'>
                        {step < 2
                            ? (<button
                                className={`button-next ${Object.keys(error).length > 0 ? 'is-error' : ''}`}
                                onClick={handleClick}
                                disabled={!!Object.keys(error).length}
                            >{step === 1 ? 'Continue' : 'Confirm'}</button>)
                            : (<button className='button-next' onClick={() => setModalOpen(false)}>Close Modal</button>)
                        }
                    </footer>
                    {alertError && <div className='alert-error' ref={errorRef}>{alertError}</div>}
                </section>
            </div>
        </div>
    );
}

ModalPay.propTypes = {
    setModalOpen: PropTypes.func.isRequired,
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired
};


