// Companion to payment-success.js for WayForPay's "unsuccessful payment" return
// URL. WayForPay POSTs here as multipart/form-data; a POST to the static
// /payment-failed page would 405, so this function catches it and 303-redirects
// to /payment-failed (POST-redirect-GET).
//
// WayForPay "unsuccessful payment" redirect URL → https://worldpeaks.com.ua/api/payment-failure

/* global URLSearchParams, Buffer */

// See payment-success.js — log only field names + these non-sensitive values.
const SAFE_FIELDS = [
  'orderReference',
  'amount',
  'currency',
  'transactionStatus',
  'reason',
  'reasonCode',
  'authCode',
  'paymentSystem',
  'transactionType',
  'fee',
  'cardType',
  'issuerBankName',
  'issuerBankCountry',
  'createdDate',
  'processingDate',
];

async function readRawBody(req) {
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    return Buffer.concat(chunks).toString('utf8');
  } catch {
    return '';
  }
}

function parseMultipart(raw, boundary) {
  const out = {};
  for (const segment of raw.split('--' + boundary)) {
    const nameMatch = segment.match(/name="([^"]+)"/);
    if (!nameMatch) continue;
    const sep = segment.indexOf('\r\n\r\n');
    if (sep === -1) continue;
    out[nameMatch[1]] = segment.slice(sep + 4).replace(/\r\n$/, '');
  }
  return out;
}

function parseBody(raw, contentType, reqBody) {
  try {
    if (contentType.includes('multipart/form-data')) {
      const boundary = (contentType.split('boundary=')[1] || '').replace(/^"|"$/g, '').trim();
      return raw && boundary ? parseMultipart(raw, boundary) : {};
    }
    if (contentType.includes('application/json')) return raw ? JSON.parse(raw) : {};
    if (raw) return Object.fromEntries(new URLSearchParams(raw));
    if (reqBody && typeof reqBody === 'object') return reqBody;
  } catch {
    /* fall through to empty */
  }
  return {};
}

export default async function handler(req, res) {
  // TEMPORARY DIAGNOSTIC — see payment-success.js. No PII. Remove after capture.
  const contentType = req.headers['content-type'] || '';
  const raw = await readRawBody(req);
  const body = parseBody(raw, contentType, req.body);
  const safe = {};
  for (const key of SAFE_FIELDS) {
    if (key in body) safe[key] = body[key];
  }
  console.log(
    '[wayforpay-return:failure]',
    JSON.stringify({
      method: req.method,
      contentType,
      rawLength: raw ? raw.length : 0,
      fields: Object.keys(body),
      safe,
    }),
  );

  res.setHeader('Location', '/payment-failed');
  res.status(303).end();
}
