import { Cart } from 'types/cart';

export const cartItems: Cart = {
  items: [
    {
      item: {
        name: 'MSI Immerse GH61 Gaming Headset',
        price: { value: 110.8, currency: 'USD' },
        uuid: '03060c4f-cb85-4ff2-a85c-baf55b28c95c'
      },
      quantity: 2
    },
    {
      item: {
        name: 'UV Flashlight Black Light',
        uuid: '60596836-71ae-4b9d-8e45-984c493e1db1',
        price: { currency: 'USD', value: 12.99 }
      },
      quantity: 3
    }
  ],
  total: { currency: 'USD', value: 300 }
};
