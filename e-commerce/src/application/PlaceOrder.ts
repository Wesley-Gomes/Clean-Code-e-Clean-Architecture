/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-constructor */
import CustomerRepository from '../domain/repository/CustomerRepository';
import SalesOrder from '../domain/entity/SaleOrder';
import PlaceOrderInput from './PlaceOrderInput';
import PlaceOrderOutput from './PlaceOrderOutput';
import ItemRepository from '../domain/repository/ItemRepository';
import CouponRepository from '../domain/repository/CouponRepository';
import SaleOrderRepositoryMemory from '../infra/repository/memory/SaleOrderRepositoryMemory';
import SaleOrderRepository from '../domain/repository/SaleOrderRepository';

export default class PlaceOrder {
  constructor(
    readonly customerRepository: CustomerRepository,
    readonly saleOrderRepository: SaleOrderRepository,
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const customer = await this.customerRepository.findById(input.CustomerId);
    if (!customer) throw new Error('Customer not found!');

    const order = new SalesOrder(customer);

    for (const ordemItem of input.orderItens) {
      const item = await this.itemRepository.findById(ordemItem.itemId);
      if (!item) throw new Error('Item not found!');
      order.addItem(item, ordemItem.quantity);
    }

    const coupon = await this.couponRepository.findByCode(input.coupon);
    if (!coupon) throw new Error('Coupon not found!');
    order.addCoupon(coupon);

    this.saleOrderRepository.save(order);

    const orderTotal = order.getTotalValue();
    const output = new PlaceOrderOutput(orderTotal);

    return output;
  }
}
