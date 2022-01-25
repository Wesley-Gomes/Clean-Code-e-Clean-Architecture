/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Item from '../../src/domain/entity/Item';
import SalesOrderItem from '../../src/domain/entity/SaleOrderItem';

test('Create item', () => {
  const orderItem = new SalesOrderItem(new Item(567, 'Monitor', 'Samsung UR550', 2399.0), 2);
  expect(orderItem.getTotal().toFixed(2)).toBe((4798).toFixed(2));
});
