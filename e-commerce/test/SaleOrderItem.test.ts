/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Item from '../src/Item';
import SalesOrderItem from '../src/SaleOrderItem';

test('Create item', () => {
  const orderItem = new SalesOrderItem(new Item(567, 'Monitor', 'Samsung UR550', 2399.0), 2);
  expect(orderItem.getTotal().toFixed(2)).toBe((4798).toFixed(2));
});
