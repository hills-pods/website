// Companion to payment-success.js for WayForPay's "unsuccessful payment" return
// URL. WayForPay POSTs here; a POST to the static /payment-failed page would
// 405, so this function catches it and 303-redirects to /payment-failed, which
// then loads with a normal GET.
//
// WayForPay "unsuccessful payment" redirect URL → https://worldpeaks.com.ua/api/payment-failure

// See payment-success.js — log only field names + these non-sensitive values,
// never the raw body (which contains clientEmail/clientPhone/cardPan/etc.).
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
  // TEMPORARY DIAGNOSTIC — see payment-success.js. Logs field names + a few
  // non-sensitive values for a declined/cancelled payment, no PII. Remove once
  // the field set is captured.
  const contentType = req.headers['content-type'] || null;
  const body = toObject(req.body, contentType);
  const safe = {};
  for (const key of SAFE_FIELDS) {
    if (key in body) safe[key] = body[key];
  }
  console.log(
    '[wayforpay-return:failure]',
    JSON.stringify({
      method: req.method,
      contentType,
      fields: Object.keys(body),
      safe,
    }),
  );

  res.setHeader('Location', '/payment-failed');
  res.status(303).end();
}
