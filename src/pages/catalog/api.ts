import { ListItem } from './types';

export function fetchItems(): Promise<ListItem[]> {
  return fetch('http://localhost:3000//api/items').then((res) => res.json());
}
