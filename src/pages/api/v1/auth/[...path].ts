import { handler } from 'utils/proxy-handler';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};

export default handler;
