/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Customer from '../../src/domain/entity/Customer';

test('Create Customer', () => {
  const cpf = '278.197.520-68';
  const customer = new Customer(123, 'Cliente teste', cpf);
  expect(customer).toBeInstanceOf(Customer);
});

test('Create Customer with invalid name', () => {
  let error;
  try {
    const cpf = '278.197.520-68';
    const customer = new Customer(123456, 'Customer.t3st', cpf);
  } catch (err) {
    error = (err as Error).message;
  }
  expect(error).toBe('Invalid Customer Name');
});

test('Create Customer with invalid cpf', () => {
  let error;
  try {
    const cpf = '111.222.333-99';
    const customer = new Customer(123456, 'Cliente teste', cpf);
  } catch (err) {
    error = (err as Error).message;
  }
  expect(error).toBe('Invalid CPF');
});
