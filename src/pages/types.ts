export type Guitar = {
  uuid: string;
  name: string;
  description: string;
  price: Money;
  brand: Brand;
  category: Category;
};

export type GuitarItem = {
  uuid: string;
  name: string;
  price: Money;
};

export type Money = {
  value: number;
  currency: string;
};

export type Brand = {
  uuid: string;
  name: string;
};

export type Category = {
  uuid: string;
  name: string;
};
