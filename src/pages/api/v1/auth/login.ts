import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

interface LoginUser {
  username: string;
  password: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await login(req.body);

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

function login(loginUser: LoginUser): Promise<string> {
  return fetch(`${process.env.API_URL}/api/v1/auth/login`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginUser)
  }).then((r) => r.json());
}
