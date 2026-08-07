// WayForPay redirects the customer's browser back to the return URL with an
// HTTP POST (the payment result is in the POST body). Static pages only answer
// GET/HEAD, so a POST straight to /thank-you returns 405 Method Not Allowed
// (the page only renders after a manual refresh, which is a GET).
//
// This Vercel serverless function is the return URL instead. It catches the
// POST and 303-redirects the browser to the static /thank-you page, which then
// loads with a normal GET (classic POST-redirect-GET).
//
// WayForPay "successful payment" redirect URL → https://worldpeaks.com.ua/api/payment-success

/* global URLSearchParams */

// Non-sensitive fields we're allowed to log the VALUES of while discovering the
// return payload's shape. Everything else (clientEmail, clientPhone, cardPan,
// merchantSignature, names, tokens, …) is deliberately NOT logged — we log only
// its key name via `fields` so we learn the structure without leaking PII.
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

function toObject(raw, contentType) {
  if (raw && typeof raw === 'object') return raw;
  if (typeof raw !== 'string' || raw === '') return {};
  try {
    if ((contentType || '').includes('application/json')) return JSON.parse(raw);
    return Object.fromEntries(new URLSearchParams(raw));
  } catch {
    return {};
  }
}

export default function handler(req, res) {
  // TEMPORARY DIAGNOSTIC — capture the SHAPE of WayForPay's return POST (which
  // field names it sends) plus a few non-sensitive values, without logging PII.
  // Visible in Vercel → Project → Logs. Remove once we've read the field set.
  const contentType = req.headers['content-type'] || null;
  const body = toObject(req.body, contentType);
  const safe = {};
  for (const key of SAFE_FIELDS) {
    if (key in body) safe[key] = body[key];
  }
  console.log(
    '[wayforpay-return:success]',
    JSON.stringify({
      method: req.method,
      contentType,
      fields: Object.keys(body), // field-set discovery — names only
      safe, // allowlisted, non-sensitive values only
    }),
  );

  res.setHeader('Location', '/thank-you');
  res.status(303).end();
}
