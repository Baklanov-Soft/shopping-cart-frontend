import { GuitarItem } from './types';

export function fetchItems(): Promise<GuitarItem[]> {
  return fetch('http://localhost:3000//api/items').then((res) => res.json());
}
