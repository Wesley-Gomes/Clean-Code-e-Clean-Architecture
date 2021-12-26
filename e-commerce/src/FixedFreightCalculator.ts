/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import FreightCalculator from './FreightCalculator';
import Item from './Item';

export default class FixedFreightCalculator implements FreightCalculator {
  calculate(item: Item): number {
    return 10;
  }
}
