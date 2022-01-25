/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import Customer from '../entity/Customer';

export default interface CustomerRepository {
  findById(CustomerId: number): Promise<Customer | undefined>;
}
