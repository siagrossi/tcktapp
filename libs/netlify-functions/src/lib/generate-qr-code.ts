import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import QRCode from 'qrcode';

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
    },
    body: (
      await QRCode.toBuffer('https://letmegooglethat.com/?q=anda+palla+bobo')
    ).toString('base64'),
    isBase64Encoded: true,
  };
};

export { handler };
