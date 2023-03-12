export interface Item {
  uuid: string;
  name: string;
  description: string;
  price: Money;
  brand: Brand;
  category: Category;
}

export interface ListItem {
  uuid: string;
  name: string;
  price: Money;
}

export interface Money {
  value: number;
  currency: 'USD';
}

export interface Brand {
  uuid: string;
  name: string;
}

export interface Category {
  uuid: string;
  name: string;
}
