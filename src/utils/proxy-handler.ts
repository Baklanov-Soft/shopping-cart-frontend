import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
import { withTokenApiRoute } from './with-token';

const proxy = httpProxy.createProxyServer();

export function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(function proxyHandler(resolve, reject) {
    delete req.headers.cookie;

    proxy.once('proxyRes', resolve).once('error', reject).web(req, res, {
      target: process.env.API_URL
    });
  });
}

type HttpVerb = 'POST' | 'PUT' | 'DELETE' | 'GET';

function isHttpVerb(s?: string): s is HttpVerb {
  return s === 'POST' || s === 'PUT' || s === 'DELETE' || s === 'GET';
}

export function makeSecureHandler(authorizedVerbs: HttpVerb[]) {
  return withTokenApiRoute(function secureHandler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    return new Promise(function proxyHandler(resolve, reject) {
      if (
        isHttpVerb(req.method) &&
        authorizedVerbs.includes(req.method) &&
        req.token
      ) {
        req.headers.authorization = `Bearer ${req.token}`;
      }
      delete req.headers.cookie;

      proxy.once('proxyRes', resolve).once('error', reject).web(req, res, {
        target: process.env.API_URL
      });
    });
  });
}
