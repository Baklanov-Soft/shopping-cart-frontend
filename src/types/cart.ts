import { ListItem, Money } from './catalog';

export interface Cart {
  items: CartItem[];
  total: Money;
}

export interface CartItem {
  item: ListItem;
  quantity: number;
}
