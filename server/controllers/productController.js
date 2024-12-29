const stripe = require('../config/stripe');

exports.getProducts = async (req, res) => {
  try {
    // Fetch product IDs from the .env file
    const productIds = [process.env.PRODUCT_ID_1, process.env.PRODUCT_ID_2];

    // Retrieve product details from Stripe
    const products = await Promise.all(
      productIds.map(async (priceId) => {
        const price = await stripe.prices.retrieve(priceId); // Fetch price details
        const product = await stripe.products.retrieve(price.product); // Fetch product details

        return {
          id: priceId,
          name: product.name,
          description: product.description,
          price: price.unit_amount / 100, // Convert from cents to dollars
          currency: price.currency,
        };
      })
    );

    // Send product details to the client
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};
