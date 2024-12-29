const stripe = require('../config/stripe');

exports.createCoupon = async (percentOff) => {
  try {
    const coupon = await stripe.coupons.create({
      percent_off: percentOff,
      duration: 'once',
    });
    return coupon.id;
  } catch (error) {
    throw new Error('Failed to create coupon');
  }
};

exports.createCheckoutSession = async (lineItems, successUrl, cancelUrl, metadata = {}) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
    });
    return session.url;
  } catch (error) {
    throw new Error('Failed to create checkout session');
  }
};
