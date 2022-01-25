/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */

import Cpf from './Cpf';

export default class Customer {
  cpf: Cpf;

  constructor(readonly customerId: number, readonly name: string, cpf: string) {
    if (!this.validateCustomerName()) throw new Error('Invalid Customer Name');
    this.cpf = new Cpf(cpf);
  }

  validateCustomerName() {
    return /^[a-zA-Z]*$/.test(this.name.replace(/[ *]/, ''));
  }
}
