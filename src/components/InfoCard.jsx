import '../assets/styles/ModalPay.css';
import PropTypes from 'prop-types';

import imgVisa from '../assets/img/visa.png';
import imgMastercard from '../assets/img/mastercard.png';
import imgAmex from '../assets/img/amex.png';
import cardFront from '../assets/img/credit_card_front.png';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export default function InfoCard({ setError, error, onSaveFormData, activateErrors }) {
    const reduxProduct = useSelector((sate) => sate.product);
    const [franchise, setFranchise] = useState('');
    const [creditCard, setCreditCard] = useState(undefined);
    const [securityId, setSecurityId] = useState(undefined);
    const [installments, setInstallments] = useState(1);
    const [owner, setOwner] = useState(undefined);
    const [expiryDate, setExpiryDate] = useState(undefined);
    const [typeId, setTypeId] = useState(1);
    const [document, setDocument] = useState(undefined);
    const [address, setAddress] = useState(undefined);

    const [tomorrow, setTomorrow] = useState('');

    useEffect(() => {
        // Recuperamos los datos del usuario almacenados en nuestro state global
        if (reduxProduct?.userInfo && Object.keys(reduxProduct.userInfo).length > 0) {
            setFranchise(reduxProduct.userInfo?.franchise);
            setCreditCard(reduxProduct.userInfo?.creditCard);
            setInstallments(reduxProduct.userInfo?.installments);
            setOwner(reduxProduct.userInfo?.owner);
            setExpiryDate(reduxProduct.userInfo?.expiryDate);
            setTypeId(reduxProduct.userInfo?.typeId);
            setDocument(reduxProduct.userInfo?.document);
            setAddress(reduxProduct.userInfo?.address);
        }
    }, [reduxProduct.userInfo])


    useEffect(() => {
        onSaveFormData({
            franchise,
            creditCard,
            securityId,
            installments,
            owner,
            expiryDate,
            typeId,
            document,
            address,
        })
    }, [franchise,
        creditCard,
        securityId,
        installments,
        owner,
        expiryDate,
        typeId,
        document,
        address]);

    useEffect(() => {
        if (activateErrors) {
            setFranchise(franchise || '');
            setCreditCard(creditCard || '');
            setSecurityId(securityId || '');
            setOwner(owner || '');
            setExpiryDate(expiryDate || '');
            setDocument(document || '');
            setAddress(address || '');
        }
    }, [activateErrors]);



    const cardImages = {
        visa: imgVisa,
        mastercard: imgMastercard,
        amex: imgAmex
    };

    const franchiseMap = {
        3: 'amex',
        4: 'visa',
        5: 'mastercard',
    };

    const imageSrc = cardImages[franchise] || cardFront;

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
        return ''
    }

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
    });

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
                if (firstLetter == 3) {
                    const validateAmex = firstLetter + creditCard[1];
                    if (!['34', '37'].includes(validateAmex)) {
                        newErrors.creditCard = '* Invalid card number';
                    } else if (creditCard.length < 15 || creditCard.length > 15) {
                        newErrors.creditCard = '* Invalid card number';
                    }
                } else if (firstLetter !== 3 && creditCard.length < 16 || !(firstLetter in franchiseMap)) {
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

    const handleWords = (e) => {
        // Obtener el código de la tecla presionada
        const charCode = e.charCode;
        // Permitir solo números (códigos de tecla del 0 al 9)
        if (charCode < 48 || charCode > 57) e.preventDefault();
    }

    const handleId = (e) => {
        const charCode = e.charCode;
        // Permitir solo números y letras 
        if ((charCode < 48 || charCode > 57) && // Números
            (charCode < 65 || charCode > 90) && // Letras mayúsculas
            (charCode < 97 || charCode > 122)) { // Letras minúsculas
            e.preventDefault();
        }
    }

    const handleChangeDate = (e) => {
        const input = e.target.value;
        // Elimina cualquier carácter no numérico y limita la longitud a 6 caracteres
        const formattedInput = input.replace(/\D/g, '').slice(0, 6);

        // Formatea el valor a un formato YY/MM
        let formattedDate = '';
        if (formattedInput.length >= 2) {
            formattedDate = `${formattedInput.slice(0, 2)}`;
            if (formattedInput.length >= 3) {
                formattedDate += `/${formattedInput.slice(2, 4)}`;
            }
        } else {
            formattedDate = formattedInput;
        }

        setExpiryDate(formattedDate);
    };

    const hadnleChangeInstallments = (e) => {
        const inputValue = e.target.value;
        // Si el valor ingresado es mayor que 48, establece el valor máximo como 48
        // Si el valor ingresado es menor que 1, establece el valor mínimo como 1
        const newValue = Math.min(Math.max(parseInt(inputValue) || 1, 1), 48);
        setInstallments(newValue.toString());
    }



    return (
        <div className="modal-content">

            <figure className='credit-card-logos'>
                <img
                    src={imgVisa}
                    alt="logo Visa"
                    className={franchise && franchise !== 'visa' ? 'black-white' : ''}
                />
                <img
                    src={imgMastercard}
                    alt="Logo Mastercard"
                    className={franchise && franchise !== 'mastercard' ? 'black-white' : ''}
                />
                <img
                    src={imgAmex}
                    alt="Logo American Express"
                    className={franchise && franchise !== 'amex' ? 'black-white' : ''}
                />
            </figure>

            <section className='credit-card-form'>
                <div className='fields-layout'>
                    <div className='input-container'>
                        <label htmlFor="credit-number" className='label'>Credit Card Number:</label>
                        <input
                            type="text"
                            id="credit-number"
                            name="credit-number"
                            className='input'
                            placeholder='xxxx xxxx xxx xxxx'
                            minLength={16}
                            maxLength={16}
                            required
                            value={creditCard}
                            onInput={(e) => setCreditCard(e.target.value)}
                            onKeyPress={handleWords}
                        />
                        <img
                            src={imageSrc}
                            alt="Image Credit Card"
                            className='img-credit-option'
                        />
                        <p className='msg-error first-error'>{error?.creditCard ?? ''}</p>
                    </div>

                    <div className='input-container no-grow'>
                        <label htmlFor="credit-number" className='label'>Installments:</label>
                        <input
                            className='input installments'
                            type="number"
                            max={48}
                            min={1}
                            required
                            value={installments}
                            onInput={(e) => setInstallments(e.target.value)}
                            onKeyPress={handleWords}
                            onChange={hadnleChangeInstallments}
                        />
                    </div>
                </div>

                <div className="fields-layout">
                    <div className='input-container'>
                        <label htmlFor="expiryDate" className='label'>Due Date:</label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            className="input"
                            maxLength={5}
                            placeholder="YY/MM"
                            value={expiryDate}
                            min={tomorrow}
                            onChange={handleChangeDate}
                            required
                        />
                        <p className='msg-error'>{error?.dueDate ?? ''}</p>
                    </div>

                    <div className='input-container'>
                        <label htmlFor="securityId" className='label'>Security Code:</label>
                        <input
                            type="password"
                            id="securityId"
                            name="securityId"
                            className="input"
                            placeholder='xxx'
                            minLength={3}
                            maxLength={3}
                            required
                            onKeyPress={handleWords}
                            value={securityId}
                            onInput={(e) => setSecurityId(e.target.value)}
                        />
                        <p className='msg-error'>{error?.securityId ?? ''}</p>
                    </div>
                </div>

                <div className='fields-layout'>
                    <div className="input-container no-grow">
                        <label htmlFor="document" className='label'>Type:</label>
                        <select
                            name="document-type"
                            id='document-typ'
                            className='document-type'
                            onChange={(e) => setTypeId(e.target.value)}
                            value={typeId}
                        >
                            <option value="1">CC</option>
                            <option value="2">CE</option>
                        </select>
                    </div>

                    <div className='input-container'>
                        <label htmlFor="document" className='label'>Document:</label>
                        <input
                            type="text"
                            id="document"
                            name="document"
                            className="input"
                            placeholder='Your ID Number'
                            required
                            value={document}
                            onInput={(e) => setDocument(e.target.value)}
                            onKeyPress={handleId}
                        />
                        <p className='msg-error'>{error?.document ?? ''}</p>
                    </div>
                </div>


                <div className='input-container'>
                    <label htmlFor="name" className='label'>Owner&apos;s Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="input"
                        placeholder='Your Name'
                        required
                        value={owner}
                        onInput={(e) => setOwner(e.target.value)}
                    />
                    <p className='msg-error'>{error?.owner ?? ''}</p>
                </div>


                <div className='input-container'>
                    <label htmlFor="address" className='label'>Adress:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="input"
                        placeholder='Your Addres'
                        required
                        value={address}
                        onInput={(e) => setAddress(e.target.value)}
                    />
                    <p className='msg-error'>{error?.address ?? ''}</p>
                </div>
            </section>
        </div>
    )
}


InfoCard.propTypes = {
    setError: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    onSaveFormData: PropTypes.func.isRequired,
    activateErrors: PropTypes.bool.isRequired
};