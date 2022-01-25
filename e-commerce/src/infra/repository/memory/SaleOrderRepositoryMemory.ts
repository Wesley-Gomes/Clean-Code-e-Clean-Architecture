/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import SalesOrder from '../../../domain/entity/SaleOrder';
import SaleOrderRepository from '../../../domain/repository/SaleOrderRepository';

export default class SaleOrderRepositoryMemory implements SaleOrderRepository {
  saleOrders: SalesOrder[];

  constructor() {
    this.saleOrders = [];
  }

  save(Order: SalesOrder): Promise<void> {
    this.saleOrders.push(Order);
    return Promise.resolve();
  }
}
