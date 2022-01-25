/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
export default class PlaceOrderInput {
  constructor(
    readonly CustomerId: number,
    readonly orderItens: { itemId: number; quantity: number }[],
    readonly date: Date,
    readonly coupon: string
  ) {}
}
