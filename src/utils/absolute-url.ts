import { IncomingMessage } from 'http';

export function getAbsoluteUrl(
  req?: IncomingMessage,
  localhostAddress = process.env.NEXTAUTH_URL || 'localhost:3000',
) {
  if (!req) {
    if (typeof window !== 'undefined') {
      return '';
    }
    // reference for vercel.com
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    // // reference for render.com
    if (process.env.RENDER_INTERNAL_HOSTNAME) {
      return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    }

    if (process.env.NEXTAUTH_URL) {
      return process.env.NEXTAUTH_URL;
    }

    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }

  let host =
    (req?.headers ? req.headers.host : window.location.host) ||
    localhostAddress;
  let protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';

  if (
    req &&
    req.headers['x-forwarded-host'] &&
    typeof req.headers['x-forwarded-host'] === 'string'
  ) {
    host = req.headers['x-forwarded-host'];
  }

  if (
    req &&
    req.headers['x-forwarded-proto'] &&
    typeof req.headers['x-forwarded-proto'] === 'string'
  ) {
    protocol = `${req.headers['x-forwarded-proto']}:`;
  }

  return protocol + '//' + host;
}
