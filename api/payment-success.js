// WayForPay redirects the customer's browser back to the return URL with an
// HTTP POST. Its result page auto-submits an HTML form, so the browser encodes
// the payload as multipart/form-data. Static pages only answer GET/HEAD, so a
// POST straight to /thank-you returns 405 (the page only renders on refresh).
//
// This Vercel function is the return URL instead: it catches the POST and
// 303-redirects to the static /thank-you page (POST-redirect-GET).
//
// WayForPay "successful payment" redirect URL → https://worldpeaks.com.ua/api/payment-success

/* global URLSearchParams, Buffer */

// Non-sensitive fields we may log the VALUES of while discovering the payload
// shape. Everything else (clientEmail, clientPhone, cardPan, merchantSignature,
// names, tokens, …) is never logged — only its key name via `fields`.
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
  // TEMPORARY DIAGNOSTIC — capture the field-name set + a few non-sensitive
  // values, no PII. Remove once we've read the payload shape.
  const contentType = req.headers['content-type'] || '';
  const raw = await readRawBody(req);
  const body = parseBody(raw, contentType, req.body);
  const safe = {};
  for (const key of SAFE_FIELDS) {
    if (key in body) safe[key] = body[key];
  }
  console.log(
    '[wayforpay-return:success]',
    JSON.stringify({
      method: req.method,
      contentType,
      rawLength: raw ? raw.length : 0,
      fields: Object.keys(body),
      safe,
    }),
  );

  res.setHeader('Location', '/thank-you');
  res.status(303).end();
}
