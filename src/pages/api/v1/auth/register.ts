import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

interface CreateUser {
  username: string;
  password: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await register(req.body);

  res
    .setHeader(
      'Set-Cookie',
      serialize('ACCESS_TOKEN', token, {
        path: '/',
        httpOnly: true,
        sameSite: true
      })
    )
    .end();
}

export default handler;

function register(createUser: CreateUser): Promise<string> {
  return fetch(`${process.env.API_URL}/api/v1/auth/register`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createUser)
  }).then((r) => r.json());
}
