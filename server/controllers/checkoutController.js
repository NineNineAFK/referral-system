const stripeService = require('../services/stripeService');
const Order = require('../models/Order');
const User = require('../models/User');

exports.checkout = async (req, res) => {
  try {
    const { products, referralCode } = req.body;

    let discount = 0;
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        discount = await stripeService.createCoupon(10); // 10% discount
      }
    }

    const lineItems = products.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const sessionUrl = await stripeService.createCheckoutSession(
      lineItems,
      `${process.env.BASE_URL}/success`,
      `${process.env.BASE_URL}/cancel`,
      { referralCode }
    );

    res.status(200).json({ url: sessionUrl });
  } catch (error) {
    res.status(500).json({ message: 'Checkout failed', error: error.message });
  }
};
