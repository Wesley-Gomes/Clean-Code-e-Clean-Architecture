/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint no-undef: "error" */
import Coupon from '../src/Coupon';
import DefaultFreightCalculator from '../src/DefaultFreightCalculator';
import FixedFreightCalculator from '../src/FixedFreightCalculator';
import Item from '../src/Item';
import SalesOrder from '../src/SaleOrder';

test('Sales Order with three items total value', () => {
  const cpf = '278.197.520-68';
  const order = new SalesOrder(123456, 'Customer test', cpf);

  order.addItem(new Item(123, 'Headset', 'HyperX Cloud Revolver', 1000.0), 1);
  order.addItem(new Item(345, 'Headset', 'HyperX Cloud Orbit S', 1999.9), 1);
  order.addItem(new Item(567, 'Monitor', 'Samsung UR550', 2399.0), 1);

  expect(order.getTotalValue().toFixed(2)).toBe((5398.9).toFixed(2));
});

test('Remove item from sales order and calculate total value', () => {
  const cpf = '278.197.520-68';
  const order = new SalesOrder(123456, 'Customer test', cpf);

  order.addItem(new Item(123, 'Headset', 'HyperX Cloud Revolver', 1000.0), 1);
  order.addItem(new Item(345, 'Headset', 'HyperX Cloud Orbit S', 1999.9), 1);
  order.addItem(new Item(567, 'Monitor', 'Samsung UR550', 2399.0), 1);

  order.removeItem(345);

  expect(order.getTotalValue().toFixed(2)).toBe((3399).toFixed(2));
});

test('Remove item that does not exist in the sales order', () => {
  const cpf = '278.197.520-68';
  const order = new SalesOrder(123456, 'Customer test', cpf);

  order.addItem(new Item(123, 'Headset', 'HyperX Cloud Revolver', 1000.0), 1);
  order.addItem(new Item(345, 'Headset', 'HyperX Cloud Orbit S', 1999.9), 1);
  order.addItem(new Item(567, 'Monitor', 'Samsung UR550', 2399.0), 1);

  let error;

  try {
    order.removeItem(346);
  } catch (err) {
    error = (err as Error).message;
  }

  expect(error).toBe('Item not exist in Sale Order');
});

test('Sales Order with valid coupon', () => {
  const cpf = '278.197.520-68';
  const order = new SalesOrder(123456, 'Customer test', cpf);

  order.addItem(new Item(123, 'Headset', 'HyperX Cloud Revolver', 1000.0), 1);
  order.addItem(new Item(345, 'Headset', 'HyperX Cloud Orbit S', 1999.9), 1);
  order.addItem(new Item(567, 'Monitor', 'Samsung UR550', 2399.0), 1);

  order.addCoupon(new Coupon('VALE20', 20));

  expect(order.getTotalValue().toFixed(2)).toBe((4319.12).toFixed(2));
});

test('Sales Order with expired coupon', () => {
  const cpf = '278.197.520-68';
  const order = new SalesOrder(123456, 'Customer test', cpf);
  order.addItem(new Item(123, 'Headset', 'HyperX Cloud Revolver', 1000.0), 1);
  order.addItem(new Item(345, 'Headset', 'HyperX Cloud Orbit S', 1999.9), 1);
  order.addItem(new Item(567, 'Monitor', 'Samsung UR550', 2399.0), 1);
  order.addCoupon(new Coupon('VALE50', 50, new Date('2021-10-10')));

  expect(order.getTotalValue().toFixed(2)).toBe((5398.9).toFixed(2));
});

test('Sales Order with three items and default freight', () => {
  const cpf = '278.197.520-68';
  const order = new SalesOrder(
    123456,
    'Customer test',
    cpf,
    new Date(),
    new DefaultFreightCalculator()
  );
  order.addItem(new Item(123, 'Headset', 'HyperX Cloud Revolver', 1000.0, 30, 30, 10, 1.1), 1);
  order.addItem(new Item(345, 'Headset', 'HyperX Cloud Orbit S', 1999.9, 30, 30, 10, 1.2), 2);
  order.addItem(new Item(567, 'Monitor', 'Samsung UR550', 2399.0, 73.2, 17.6, 46.5, 7.8), 2);
  const freight = order.getFreight();
  expect(freight).toBe(191);
});

test('Sales Order with three items and fixed freight', () => {
  const cpf = '278.197.520-68';
  const order = new SalesOrder(
    123456,
    'Customer test',
    cpf,
    new Date(),
    new FixedFreightCalculator()
  );
  order.addItem(new Item(123, 'Headset', 'HyperX Cloud Revolver', 1000.0, 30, 30, 10, 1.1), 1);
  order.addItem(new Item(345, 'Headset', 'HyperX Cloud Orbit S', 1999.9, 30, 30, 10, 1.2), 2);
  order.addItem(new Item(567, 'Monitor', 'Samsung UR550', 2399.0, 73.2, 17.6, 46.5, 7.8), 2);
  const freight = order.getFreight();
  expect(freight).toBe(50);
});
