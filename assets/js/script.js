
// ADD TO CART PRODUCTS
const addToCartButtons = document.querySelectorAll('.add_to_cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.card');
        const productId = productElement.dataset.productId;
        const productName = productElement.dataset.productName;
        const productPrice = parseFloat(productElement.dataset.productPrice);
        // const productImage = productElement.dataset.productImage;
        const productImage = productElement.dataset.productImage || 'assets/images/default.jpeg'; // Use default image if not provided

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        // Get the current cart or create an empty array if none exists
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
            // If the product is already in the cart, increase its quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If the product is not in the cart, add it
            cart.push(product);
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Display the popup message
        alert('Product added to the cart');

        // Update the cart count dynamically
        updateCartCount();
    });
});

// Function to update the cart count displayed in the HTML
function updateCartCount() {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate total quantity of items in the cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Update the cartNum element
    const cartNumElement = document.getElementById('cartNum');
    cartNumElement.textContent = totalItems; // Display the total number of items
}

// Initial update of the cart count when the page loads
updateCartCount();




// contact form validation 

function validateForm() {
  // Clear previous error messages
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  const name = document.getElementById("the-name").value.trim();
  const email = document.getElementById("the-email").value.trim();
  const phone = document.getElementById("the-phone").value.trim();
  const reason = document.getElementById("the-reason").value.trim();
  const message = document.getElementById("the-message").value.trim();

  let isValid = true;

  // Name validation
  if (!name) {
    document.getElementById("name-error").textContent = "Please enter your name.";
    isValid = false;
  }

  // Email validation
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    document.getElementById("email-error").textContent = "Please enter a valid email address.";
    isValid = false;
  }

  // Phone validation
  if (!phone || !/^\d{10}$/.test(phone)) {
    document.getElementById("phone-error").textContent = "Please enter a valid 10-digit phone number.";
    isValid = false;
  }

  // Reason validation
  if (!reason) {
    document.getElementById("reason-error").textContent = "Please select a reason for contacting us.";
    isValid = false;
  }

  // If all validations pass
  if (isValid) {
    alert("Thank you for contacting us! Your message has been successfully submitted.");
    window.location.href = "index.html";
  }

  return false;
}


    // Quick View Modal Functionality
    document.querySelectorAll('.card span').forEach((element, index) => {
        element.addEventListener('click', function () {
            const productCard = this.parentElement;
            const imageSrc = productCard.querySelector('img').src;
            const productName = `Product ${index + 1}`;
            const productDescription = `Description for Product ${index + 1}.`;
            const productPrice = `$${(index + 1) * 10}.00`;

            // Populate modal with product details
            document.getElementById('product-image').src = imageSrc;
            document.getElementById('product-name').innerText = productName;
            document.getElementById('product-description').innerText = productDescription;
            document.getElementById('product-price').innerText = `Price: ${productPrice}`;

            // Display modal
            document.getElementById('product-detail-modal').style.display = 'block';
        });
    });

    // Close Modal
    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById('product-detail-modal').style.display = 'none';
    });

    // Close Modal on Click Outside
    window.addEventListener('click', function (event) {
        if (event.target.id === 'product-detail-modal') {
            document.getElementById('product-detail-modal').style.display = 'none';
        }
    });

