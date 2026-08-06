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
export default function handler(req, res) {
  // TEMPORARY DIAGNOSTIC — log exactly what WayForPay POSTs to the return URL,
  // so we can see the real field set (amount, currency, orderReference,
  // transactionStatus, merchantSignature, …) instead of guessing. Visible in
  // Vercel → Project → Logs (or `vercel logs`). Remove once we've read it.
  // WayForPay masks the card number, so no full PAN is logged.
  console.log(
    '[wayforpay-return:success]',
    JSON.stringify({
      method: req.method,
      contentType: req.headers['content-type'] || null,
      query: req.query || null,
      body: req.body ?? null,
    }),
  );

  res.setHeader('Location', '/thank-you');
  res.status(303).end();
}
