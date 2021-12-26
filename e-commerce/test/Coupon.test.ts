/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Coupon from '../src/Coupon';

test('Valid Coupon', () => {
  const percentage = 20;
  const today = new Date('2025-01-01');
  const coupon = new Coupon('VALE20', percentage, today);
  expect(coupon.isValid(new Date('2022-01-01'))).toBeTruthy();
});

test('Expired Coupon', () => {
  const percentage = 35;
  const today = new Date('2020-01-01');
  const coupon = new Coupon('VALE35', percentage, today);
  expect(coupon.isValid(new Date('2022-01-01'))).toBeFalsy();
});

test('Calculate discount', () => {
  const percentage = 20;
  const today = new Date('2025-01-01');
  const coupon = new Coupon('VALE20', percentage, today);
  expect(coupon.calculateDiscount(100)).toBe(20);
});
