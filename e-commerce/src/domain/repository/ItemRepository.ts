/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Item from '../entity/Item';

export default interface ItemRepository {
  findById(itemId: number): Promise<Item | undefined>;
}
