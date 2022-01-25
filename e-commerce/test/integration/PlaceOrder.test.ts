/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import PlaceOrder from '../../src/application/PlaceOrder';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import CustomerRepositoryMemory from '../../src/infra/repository/memory/customerRepositoryMemory';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import SaleOrderRepositoryMemory from '../../src/infra/repository/memory/SaleOrderRepositoryMemory';

test('Place an Order', async () => {
  const customerRepository = new CustomerRepositoryMemory();
  const saleOrderRepositoryMemory = new SaleOrderRepositoryMemory();
  const itemRepository = new ItemRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const placeOrder = new PlaceOrder(
    customerRepository,
    saleOrderRepositoryMemory,
    itemRepository,
    couponRepository
  );
  const input = {
    CustomerId: 1234,
    orderItens: [
      { itemId: 123, quantity: 1 },
      { itemId: 345, quantity: 1 },
      { itemId: 567, quantity: 1 },
    ],
    date: new Date('2022-01-25'),
    coupon: 'VALE20',
  };
  const output = await placeOrder.execute(input);
  expect(output.total.toFixed(2)).toBe((4319.12).toFixed(2));
});

test('Place an Order with not registered CustomerId', async () => {
  let error;
  try {
    const customerRepository = new CustomerRepositoryMemory();
    const saleOrderRepositoryMemory = new SaleOrderRepositoryMemory();
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const placeOrder = new PlaceOrder(
      customerRepository,
      saleOrderRepositoryMemory,
      itemRepository,
      couponRepository
    );
    const input = {
      CustomerId: 123456,
      orderItens: [
        { itemId: 123, quantity: 1 },
        { itemId: 345, quantity: 1 },
        { itemId: 567, quantity: 1 },
      ],
      date: new Date('2022-01-25'),
      coupon: 'VALE20',
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(1000);
  } catch (err) {
    error = (err as Error).message;
  }
  expect(error).toBe('Customer not found!');
});

test('Place an Order with not registered itemId', async () => {
  let error;
  try {
    const customerRepository = new CustomerRepositoryMemory();
    const saleOrderRepositoryMemory = new SaleOrderRepositoryMemory();
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const placeOrder = new PlaceOrder(
      customerRepository,
      saleOrderRepositoryMemory,
      itemRepository,
      couponRepository
    );
    const input = {
      CustomerId: 12345,
      orderItens: [
        { itemId: 321, quantity: 1 },
        { itemId: 543, quantity: 1 },
        { itemId: 765, quantity: 1 },
      ],
      date: new Date('2022-01-25'),
      coupon: 'VALE20',
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(1000);
  } catch (err) {
    error = (err as Error).message;
  }
  expect(error).toBe('Item not found!');
});

test('Place an Order with not registered coupon', async () => {
  let error;
  try {
    const customerRepository = new CustomerRepositoryMemory();
    const saleOrderRepositoryMemory = new SaleOrderRepositoryMemory();
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const placeOrder = new PlaceOrder(
      customerRepository,
      saleOrderRepositoryMemory,
      itemRepository,
      couponRepository
    );
    const input = {
      CustomerId: 12345,
      orderItens: [
        { itemId: 123, quantity: 1 },
        { itemId: 345, quantity: 1 },
        { itemId: 567, quantity: 1 },
      ],
      date: new Date('2022-01-25'),
      coupon: 'VALE25',
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(1000);
  } catch (err) {
    error = (err as Error).message;
  }
  expect(error).toBe('Coupon not found!');
});
