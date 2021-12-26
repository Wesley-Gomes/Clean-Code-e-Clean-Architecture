/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved

import Cpf from '../src/Cpf';

test('Invalid cpf', () => {
  const testValues = ['111.222.333-99', 'aaa.BBB.cCc-DD', '1a1.2b2.33c-9d', '111.111.111-11'];
  let cpf;
  let error;
  try {
    testValues.forEach((value) => {
      cpf = new Cpf(value);
    });
  } catch (err) {
    error = (err as Error).message;
  }
  expect(error).toBe('Invalid CPF');
});

test('Invalid cpf not doted', () => {
  let error;
  try {
    const cpf = new Cpf('11122233399');
  } catch (err) {
    error = (err as Error).message;
  }
  expect(error).toBe('Invalid CPF');
});

test('Invalid cpf characters number', () => {
  let error;
  try {
    const cpf = new Cpf('111222333');
  } catch (err) {
    error = (err as Error).message;
  }
  expect(error).toBe('Invalid CPF');
});

test('Valid cpf', () => {
  const cpf = new Cpf('481.329.040-01');
  expect(cpf).toBeTruthy();
});

test('Valid cpf not doted', () => {
  const testValues = ['27819752068', '278197520-68'];
  let cpf;
  testValues.forEach((value) => {
    cpf = new Cpf(value);
    expect(cpf).toBeTruthy();
  });
});
