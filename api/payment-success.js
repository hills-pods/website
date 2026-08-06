// WayForPay redirects the customer's browser back to the return URL with an
// HTTP POST (the payment result is in the POST body). Static pages only answer
// GET/HEAD, so a POST straight to /thank-you returns 405 Method Not Allowed
// (the page only renders after a manual refresh, which is a GET).
//
// This Vercel serverless function is the return URL instead. It catches the
// POST and 303-redirects the browser to the static /thank-you page, which then
// loads with a normal GET (classic POST-redirect-GET). We intentionally ignore
// the POST body here — the authoritative "paid" confirmation is handled
// server-side via WayForPay's serviceUrl / the Meta Conversions API, not this
// browser redirect.
//
// WayForPay "successful payment" redirect URL → https://worldpeaks.com.ua/api/payment-success
export default function handler(req, res) {
  res.setHeader('Location', '/thank-you');
  res.status(303).end();
}
