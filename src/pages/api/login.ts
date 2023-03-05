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

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function login(loginUser: LoginUser) {
  return Promise.resolve(token);
}
