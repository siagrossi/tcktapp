import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import QRCode from 'qrcode';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

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

  const qrCode = await QRCode.toDataURL(event.queryStringParameters['url']);

  const pdfDoc = await PDFDocument.create();

  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const qrImage = await pdfDoc.embedPng(qrCode);

  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();

  const fontSize = 30;

  page.drawText('Here is your ticket for Tu Vieja Fest!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: helveticaBoldFont,
    color: rgb(0, 0.53, 0.71),
  });

  page.drawImage(qrImage, {
    x: width / 2 - 75,
    y: height / 2 - 75,
    width: 150,
    height: 150,
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/pdf',
    },
    body: await pdfDoc.saveAsBase64(),
    isBase64Encoded: true,
  };
};

export { handler };
