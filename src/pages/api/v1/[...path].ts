import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};

function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(function proxyHandler(resolve, reject) {
    proxy.once('proxyRes', resolve).once('error', reject).web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL
    });
  });
}

export default handler;
