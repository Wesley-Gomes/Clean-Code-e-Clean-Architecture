/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import SalesOrder from '../entity/SaleOrder';

export default interface SaleOrderRepository {
  save(Order: SalesOrder): Promise<void>;
}
