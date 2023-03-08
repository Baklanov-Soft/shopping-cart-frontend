import { ListItem } from '@types/catalog';

export function fetchItems(): Promise<ListItem[]> {
  return fetch('http://localhost:3000//api/items').then((res) => res.json());
}
