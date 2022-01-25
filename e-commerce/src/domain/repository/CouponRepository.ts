/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Coupon from '../entity/Coupon';

export default interface CouponRepository {
  findByCode(coupon: string): Promise<Coupon | undefined>;
}
