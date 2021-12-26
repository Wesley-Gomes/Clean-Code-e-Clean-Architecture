/* eslint-disable no-empty-function */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */

import Item from './Item';

export default class SalesOrderItem {
  constructor(readonly item: Item, readonly quantity: number) {}

  getTotal() {
    return this.item.price * this.quantity;
  }
}
