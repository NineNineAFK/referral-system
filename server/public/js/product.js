async function fetchProducts() {
    try {
      const response = await fetch('/products'); // API endpoint
      const data = await response.json();
      const productContainer = document.getElementById('product-container');
  
      data.products.forEach((product) => {
        const productElement = `
          <div class="product">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)} ${product.currency.toUpperCase()}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
          </div>
        `;
        productContainer.innerHTML += productElement;
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  // Call the function to fetch and display products
  fetchProducts();
  