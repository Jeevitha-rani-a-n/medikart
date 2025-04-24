let cart = JSON.parse(localStorage.getItem("cart")) || [];

let products = [
    { id: 1, name: "Aloe Vera Gel", price: 299, description: "Soothes and hydrates skin", category: "skincare",  image: "AloveraGel.webp" },
    { id: 2, name: "Vitamin C Serum", price: 499, description: "Brightens skin tone", category: "skincare",  image: "VitaminCserum.jpg" },
    { id: 3, name: "Moisturizing Lotion", price: 350, description: "Intensive skin hydration", category: "bodycare",  image: "MoisturizingBodyloation.jpg" },
    { id: 4, name: "Sunscreen SPF 50", price: 699, description: "Advanced UV protection", category: "skincare",  image: "SunscreenSPF50.webp" },
    { id: 5, name: "Body Scrub", price: 450, description: "Gently exfoliates skin", category: "bodycare",  image: "scrub.jpg" },
    { id: 6, name: "Lip Balm", price: 150, description: "Repairs dry lips", category: "skincare",  image: "lipbalm.webp" },
    { id: 7, name: "Hand Cream", price: 200, description: "Softens hands instantly", category: "bodycare",  image: "handcream.jpg" },
    { id: 8, name: "Paracetamol Tablets", price: 60, description: "Fever and pain relief (10 tablets)", category: "medicine",  image: "Paracetamol.jpg" },
    { id: 9, name: "Vitamin D3 Supplement", price: 320, description: "Bone health support", category: "supplements",  image: "vitd3.avif" },
    { id: 10, name: "Ibuprofen Tablets", price: 80, description: "Anti-inflammatory pain reliever", category: "medicine",  image: "Ibuprofen.jpg" },
    { id: 11, name: "Antacid Tablets", price: 75, description: "Relieves heartburn and acidity", category: "medicine",  image: "Antacid.webp" },
    { id: 12, name: "Hair Growth Serum", price: 550, description: "Stimulates hair follicles", category: "bodycare",  image: "hairserum.webp" },
    { id: 13, name: "Omega-3 Capsules", price: 480, description: "Supports heart health", category: "supplements",  image: "omega3.webp" },
    { id: 14, name: "Face Mask", price: 350, description: "Cleanses and rejuvenates", category: "skincare",  image: "facemask.webp" },
    { id: 15, name: "Night Cream", price: 400, description: "Revitalizes skin overnight", category: "skincare",  image: "nightcream.jpg" },
    { id: 16, name: "Multivitamin Tablets", price: 280, description: "Daily immunity booster", category: "supplements",  image: "multivit.webp" },
    { id: 17, name: "Charcoal Cleanser", price: 299, description: "Deep pore cleanser", category: "skincare",  image: "charcoal.webp" },
    { id: 18, name: "Cough Syrup", price: 150, description: "Relieves cough & throat irritation", category: "medicine",  image: "Coughsyrup.webp" },
    { id: 19, name: "Pain Relief Spray", price: 220, description: "Muscle and joint pain relief", category: "medicine",  image: "painrelief.jpg" },
    { id: 20, name: "Foot Cream", price: 260, description: "Softens cracked heels", category: "bodycare",  image: "Footcream.jpg" }
  ]
  
function loadProducts() {
  displayProducts(products);
  updateCartCount();
}

function displayProducts(items) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  items.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image">
    <div class="product-details">
    <h3 class="product-name">${product.name}</h3>
    <p class="product-price">₹${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  </div>
`;

    container.appendChild(card);
  });
}

function loadProductDetail() {
  const id = localStorage.getItem("viewProduct");
  const product = products.find(p => p.id == id);
  if (!product) return;
  const container = document.getElementById("product-detail-container");
  container.innerHTML = `
  <h2>${product.name}</h2>
  <img src="srcs/${product.image}" class="product-image" style="max-width: 300px;">
  <p class="product-price">₹${product.price}</p>
  <p class="product-description">${product.description}</p>
  <button onclick="addToCart(${product.id})">Add to Cart</button>
  <button onclick="buyNow(${product.id})">Buy Now</button>
  <div id="cart">
  🛒 <span id="cart-count">0</span>
</div>

`;

}

function addToCart(index) {
    const product = products[index];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = cart.some(item => item.name === product.name);
    if (!productExists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} has been added to your cart!`);
    } else {
      alert(`${product.name} is already in your cart.`);
    }
  }

function buyNow(id) {
  addToCart(id);
  window.location.href = "checkout.html";
}

function goToCart() {
    let previousPage = null;
    previousPage = "productPage";
    document.getElementById("productPage").classList.add("hidden");
    document.getElementById("detailsPage").classList.add("hidden");
    document.getElementById("checkoutPage").classList.remove("hidden");
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.querySelector(".checkout");
    container.innerHTML = `
      <h3>Checkout</h3>
      ${cart.map((item, i) => `
        <div>
          <b>${item.name}</b> (₹${item.price})<br/>
          Quantity: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${i}, this.value)">
        </div>
      `).join("")}
      <p> Please fill out your details.</p>
      <input type="text" placeholder="Name" id="name">
      <textarea placeholder="Building No., Area, City, State, Pincode" id="address"></textarea>
      <input type="email" placeholder="Email" id="email">
      <input type="text" placeholder="Contact Number" id="contact">
      <button onclick="placeOrder()">Buy</button>
      <button onclick="goBack()">Back</button>
    `;
  }

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById("cartCount").textContent = total;
  }

function filterProducts() {
    const term = document.getElementById("search-bar").value.toLowerCase();
    const cat = document.getElementById("categoryfilter").value.toLowerCase();
  
    const filtered = products.filter((p) =>
      (cat === "all" || p.category.toLowerCase() === cat) &&
      p.name.toLowerCase().includes(term)
    );
  
    displayProducts(filtered);
  }

  function placeOrder() {
    // Clear cart
    localStorage.removeItem("cart");
  
    // Replace the form with a thank-you message
    const container = document.querySelector(".checkout-container");
    container.innerHTML = `
      <h2 style="text-align:center; color:#b03060;">Thank you for your order! 💖</h2>
      <p style="text-align:center; font-size: 18px;">We’ve received your details and your order is being processed.</p>
      <div style="text-align:center; margin-top: 20px;">
        <button onclick="goHome()" style="padding: 10px 20px; background-color: #ffb6c1; color: white; border: none; border-radius: 8px; cursor: pointer;">Go to Home</button>
      </div>
    `;
  }
  
  function goHome() {
    window.location.href = "index.html"; // change this to your homepage if different
  }
  
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-container");
  
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    let total = 0;
    let html = '<ul style="list-style-type:none; padding: 0;">';
  
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      const itemTotal = product.price * item.qty;
      total += itemTotal;
  
      html += `
        <li style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <strong>${product.name}</strong><br>
          Price: ₹${product.price} × 
          <input type="number" min="1" value="${item.qty}" onchange="updateQuantity(${item.id}, this.value)" style="width: 50px; padding: 4px; border-radius: 6px;"> 
          = ₹${itemTotal}
        </li>
      `;
    });
  
    html += `</ul><h3>Total: ₹${total}</h3>`;
    container.innerHTML = html;
  }
  
  function updateQuantity(id, newQty) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === id);
  
    if (index !== -1) {
      cart[index].qty = parseInt(newQty);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart(); // reload the display with new quantity
      updateCartCount(); // optional if you have a live cart count
    }
  }
  
  window.onload = loadProducts;
