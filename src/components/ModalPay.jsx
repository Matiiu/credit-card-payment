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

            return'All fields are required';
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

    // useEffect(() => {
    //     const getCurrentDate = () => {
    //         const tomorrowDate = new Date();
    //         tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    //         const year = tomorrowDate.getFullYear();
    //         let month = tomorrowDate.getMonth() + 1;
    //         let day = tomorrowDate.getDate();

    //         // Asegurarse de que el mes y el día tienen dos dígitos
    //         month = month < 10 ? `0${month}` : month;
    //         day = day < 10 ? `0${day}` : day;

    //         setTomorrow(`${year}-${month}-${day}`);
    //     }

    //     getCurrentDate();
    // });

    const validateFields = () => {
        const newErrors = {};

        // Validar campo de número de tarjeta de crédito
        if (creditCard !== undefined) {
            if (!creditCard) {
                newErrors.creditCard = '* The field is required';
                setFranchise('')
            } else {
                const firstLetter = creditCard[0];
                // Asignamos la franquicia o vacío si no corresponde a ninguno de los números del map
                setFranchise(franchiseMap[firstLetter] || '');

                // Validamos que el primer número pertenezca a una franquicia válida y que tenga 16 caracteres
                if (creditCard.length < 16 || !(firstLetter in franchiseMap)) {
                    newErrors.creditCard = '* Invalid card number';
                }
            }
        }

        // Validar código de seguridad
        if (securityId !== undefined && !securityId) {
            newErrors.securityId = '* The field is required'
        }

        // Validar campo de fecha de expiración
        if (expiryDate !== undefined) {
            const dueDate = validateDueDate();
            if (dueDate) {
                newErrors.dueDate = `* ${dueDate}`
            }
        }

        // Validar campo Documento
        if (document !== undefined && !document) {
            newErrors.document = '* The field is required'
        }

        // Validar campo de nombre del propietario
        if (owner !== undefined && !owner) {
            newErrors.owner = '* The field is required';
        }

        // Validar la dirección
        if (address !== undefined && !address) {
            newErrors.address = '* The field is required';
        }

        // Actualizar el estado de los errores
        setError(newErrors);
    }

    useEffect(() => {
        // validar los campos
        validateFields();

    }, [creditCard, securityId, expiryDate, document, owner, address])


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

    const stepComponents = {
        1: <InfoCard
             setFranchise={setFranchise}
             setCreditCard={setCreditCard}
             setSecurityId={setSecurityId}
             setInstallments={setInstallments}
             setOwner={setOwner}
             setExpiryDate={setExpiryDate}
             setTypeId={setTypeId}
             setDocument={setDocument}
             setAddress={setAddress}
             franchise={franchise}
             creditCard={creditCard}
             securityId={securityId}
             installments={installments}
             owner={owner}
             expiryDate={expiryDate}
             typeId={typeId}
             document={document}
             address={address}
           />,
        2: <Summary 
                product={product}
                creditCard={creditCard}
                installments={installments}
                typeId={typeId}
                document={document}
                owner={owner}
                address={address}
            />,
        default: <p className=""></p>
      };


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
                        {stepComponents[step]}
                    </div>
                    <footer className='buttons-form'>
                        <button
                            className={`button-next ${Object.keys(error).length > 0 ? 'is-error' : ''}`}
                            onClick={handleClick}
                            disabled={!!Object.keys(error).length}
                        >{step === 1 ? 'Continue' : 'Confirm'}</button>
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


