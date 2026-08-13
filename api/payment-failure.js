// Companion to payment-success.js for WayForPay's "unsuccessful payment" return
// URL. WayForPay POSTs here; a POST to the static /payment-failed page would
// 405, so this function catches it and 303-redirects to /payment-failed, which
// then loads with a normal GET.
//
// WayForPay "unsuccessful payment" redirect URL → https://worldpeaks.com.ua/api/payment-failure
export default function handler(req, res) {
  res.setHeader('Location', '/payment-failed');
  res.status(303).end();
}
