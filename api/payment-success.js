// WayForPay redirects the customer's browser back to the return URL with an
// HTTP POST (its result page auto-submits a form). Static pages only answer
// GET/HEAD, so a POST straight to /thank-you returns 405. This function catches
// the POST and 303-redirects to the static /thank-you page, which then loads
// with a normal GET (POST-redirect-GET). On /thank-you the Meta Pixel fires a
// Lead event.
//
// WayForPay "successful payment" redirect URL → https://worldpeaks.com.ua/api/payment-success
export default function handler(req, res) {
  res.setHeader('Location', '/thank-you');
  res.status(303).end();
}
