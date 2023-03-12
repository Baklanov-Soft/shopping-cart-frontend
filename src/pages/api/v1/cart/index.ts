import { NextApiRequest, NextApiResponse } from 'next';
import { Cart } from 'types/cart';
import { cartItems } from './cart-items';

function handler(_req: NextApiRequest, res: NextApiResponse<Cart>) {
  res.status(200).json(cartItems);
}

export default handler;
