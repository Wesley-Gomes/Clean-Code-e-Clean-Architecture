/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Customer from '../../../domain/entity/Customer';
import CustomerRepository from '../../../domain/repository/CustomerRepository';

export default class CustomerRepositoryMemory implements CustomerRepository {
  customers: Customer[];

  constructor() {
    this.customers = [
      new Customer(123, 'Anderson', '278.197.520-68'),
      new Customer(1234, 'Matheus', '811.944.530-90'),
      new Customer(12345, 'Fabio', '61279068060'),
    ];
  }

  findById(customerId: number): Promise<Customer | undefined> {
    return Promise.resolve(this.customers.find((customer) => customer.customerId === customerId));
  }
}
