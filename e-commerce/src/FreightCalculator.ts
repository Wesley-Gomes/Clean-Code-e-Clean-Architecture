/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Item from './Item';

export default interface FreightCalculator {
  calculate(item: Item): number;
}
