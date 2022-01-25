/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Item from '../../../domain/entity/Item';
import ItemRepository from '../../../domain/repository/ItemRepository';

export default class ItemRepositoryMemory implements ItemRepository {
  item: Item[];

  constructor() {
    this.item = [
      new Item(123, 'Headset', 'HyperX Cloud Revolver', 1000.0),
      new Item(345, 'Headset', 'HyperX Cloud Orbit S', 1999.9),
      new Item(567, 'Monitor', 'Samsung UR550', 2399.0),
    ];
  }

  findById(itemId: number): Promise<Item | undefined> {
    return Promise.resolve(this.item.find((item) => item.itemId === itemId));
  }
}
