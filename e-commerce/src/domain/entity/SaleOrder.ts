/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Coupon from './Coupon';
import Customer from './Customer';
import DefaultFreightCalculator from './DefaultFreightCalculator';
import FreightCalculator from './FreightCalculator';
import Item from './Item';
import SalesOrderItem from './SaleOrderItem';

export default class SalesOrder {
  private items: SalesOrderItem[];

  coupon: Coupon | undefined;

  private freight: number;

  constructor(
    readonly customer: Customer,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator()
  ) {
    this.items = [];
    this.freight = 0;
  }

  addItem(item: Item, quantity: number) {
    this.freight += this.freightCalculator.calculate(item) * quantity;
    this.items.push(new SalesOrderItem(item, quantity));
  }

  removeItem(id: number) {
    let count = 0;

    this.items.forEach((value, index) => {
      if (value.item.itemId === id) {
        this.items.splice(index, 1);
        count += 1;
      }
    });

    if (count === 0) throw new Error('Item not exist in Sale Order');
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isValid(this.date)) return;
    this.coupon = coupon;
  }

  getTotalValue() {
    let total = 0;

    this.items.forEach((item) => {
      total += item.getTotal();
    });

    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date);
    }

    return total;
  }

  getFreight() {
    return this.freight;
  }
}
