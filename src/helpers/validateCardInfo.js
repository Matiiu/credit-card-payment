export const validateDueDate = (expiryDate) => {
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
        return 'Invalid month'
    }
    return '';
}

export const validateFields = (data) => {
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
        return 'All fields are required';
    }
    const firstLetter = creditCard[0];

    const franchiseMap = {
        3: 'amex',
        4: 'visa',
        5: 'mastercard',
    };

    // Validación para las amex
    if (firstLetter == 3) {
        const validateAmex = firstLetter + creditCard[1];
        // Debe iniciar en 37 0 34
        if (!['34', '37'].includes(validateAmex)) {
            return 'Invalid American Express card number';
        }
        // Debe tener 15 digitos
        if (creditCard.length < 15 || creditCard.length > 15) {
            return 'Invalid American Express card number';
        }
    }

        if (firstLetter != 3 && creditCard.length < 16 || !(firstLetter in franchiseMap)) {
            return 'The credit card is not valid';
        }

        const dueDate = validateDueDate(expiryDate);
        if (dueDate) {
            return dueDate;
        }
        return ''
    }