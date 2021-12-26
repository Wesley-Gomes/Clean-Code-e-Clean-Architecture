/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
export default class Coupon {
  constructor(readonly coupon: string, readonly percentage: number, readonly expireDate?: Date) {}

  isValid(today: Date) {
    if (!this.expireDate) return true;
    return this.expireDate.getTime() >= today.getTime();
  }

  calculateDiscount(amount: number, today: Date = new Date()) {
    if (!this.isValid(today)) return 0;
    return (amount * this.percentage) / 100;
  }
}
