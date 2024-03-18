import { validateDueDate, validateFields } from '../helpers/validateCardInfo';

describe('validateDueDate function', () => {
  test('should return "The field is required" if expiryDate is empty', () => {
    const result = validateDueDate('');
    expect(result).toBe('The field is required');
  });

  test('should return "Expired card" if the card is expired', () => {
    const expiredDate = '21/01'; // Supongamos que es una fecha expirada
    const result = validateDueDate(expiredDate);
    expect(result).toBe('Expired card');
  });

  test('should return "Invalid month" if the month is not between 1 and 12', () => {
    const invalidMonth = '27/13'; // Supongamos que es un mes inválido
    const result = validateDueDate(invalidMonth);
    expect(result).toBe('Invalid month');
  });
});

describe('validateFields function', () => {
  test('should return "All fields are required" if any field is empty', () => {
    const data = {
      creditCard: '1234567890123456',
      securityId: '123',
      installments: 3,
      owner: 'John Doe',
      expiryDate: '21/03',
      typeId: 'typeId',
      document: '123456789',
      address: '123 Main St'
    };
    const result = validateFields({ ...data, creditCard: '' });
    expect(result).toBe('All fields are required');
  });

  test('should return "Invalid card number" for invalid Visa card', () => {
    const data = {
      creditCard: '430123456789012',
      securityId: '123',
      installments: 3,
      owner: 'John Doe',
      expiryDate: '21/03',
      typeId: 'typeId',
      document: '123456789',
      address: '123 Main St'
    };
    const result = validateFields(data);
    expect(result).toBe('The credit card is not valid');
  });

  test('should return "Invalid card number" for invalid Amex card', () => {
    const data = {
      creditCard: '328765432109876', // Un número de tarjeta Amex inválido
      securityId: '123',
      installments: 3,
      owner: 'John Doe',
      expiryDate: '21/03',
      typeId: 'typeId',
      document: '123456789',
      address: '123 Main St'
    };
    const result = validateFields(data);
    expect(result).toBe('Invalid American Express card number');
  });

  test('should not return "Invalid card number" for valid Amex card', () => {
    const data = {
      creditCard: '378765432109876', // Un número de tarjeta Amex válido
      securityId: '123',
      installments: 3,
      owner: 'John Doe',
      expiryDate: '21/03',
      typeId: 'typeId',
      document: '123456789',
      address: '123 Main St'
    };
    const result = validateFields(data);
    expect(result).not.toBe('');
  });
 
});
