import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import QRCode from 'qrcode';

// https://letmegooglethat.com/?q=anda+palla+bobo

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (
    !event.queryStringParameters ||
    event.queryStringParameters['url'] == null
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Parameter 'url' missing.`,
      }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
    },
    body: (await QRCode.toBuffer(event.queryStringParameters['url'])).toString(
      'base64'
    ),
    isBase64Encoded: true,
  };
};

export { handler };
