import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler
} from 'next';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';

declare module 'http' {
  interface IncomingMessage {
    token?: string;
  }
}

export function withTokenSsr<Props>(
  handler: (
    context: GetServerSidePropsContext
  ) =>
    | GetServerSidePropsResult<Props>
    | Promise<GetServerSidePropsResult<Props>>
) {
  return function getServerSidePropsWithToken(
    context: GetServerSidePropsContext
  ) {
    const token = getToken(context.req);
    Object.defineProperty(
      context.req,
      'token',
      createPropertyDescriptor(token)
    );
    return handler(context);
  };
}

function getToken(req: { cookies: NextApiRequestCookies }) {
  return req.cookies['ACCESS_TOKEN'];
}

function createPropertyDescriptor(token?: string): PropertyDescriptor {
  return {
    value: token,
    writable: false
  };
}

export function withTokenApiRoute(handler: NextApiHandler): NextApiHandler {
  return function apiHandlerWithToken(req, res) {
    const token = getToken(req);
    Object.defineProperty(req, 'token', createPropertyDescriptor(token));
    return handler(req, res);
  };
}
