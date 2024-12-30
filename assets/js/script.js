// adding products on click of add_to_cart button 

// let num = 0;
// document.querySelector(".cartItems").style.display = "none";

// document.querySelectorAll(".add_to_cart").forEach(function (button) {
//     button.addEventListener("click", function (event) {
//         // Prevent event propagation to parent elements
//         event.stopPropagation();

//         // Display the cart
//         document.querySelector(".cartItems").style.display = "block";

//         // Increment the cart count
//         num++;
//         document.querySelector("#cartNum").innerHTML = num;

//         // Get the parent card element
//         let card = button.closest(".card");

//         // Create and append the cart item
//         let div = document.createElement("div");
//         div.classList.add("cartList");

//         div.innerHTML = `
//             <i class="fa fa-times cross" onclick="remove(this)" aria-hidden="true"></i>
//             <img src="${card.querySelector("img").src}" alt="Product Image">
//             <p>$2345</p>
//         `;
//         document.querySelector(".cartItems").appendChild(div);
//     });
// });

// // To remove cart items
// function remove(element) {
//     // Decrement the cart count
//     num--;
//     document.querySelector("#cartNum").innerHTML = num;

//     // Remove the cart item
//     element.closest(".cartList").remove();

//     // Hide the cart if no items are left
//     if (num === 0) {
//         document.querySelector(".cartItems").style.display = "none";
//     }
// }



let num = 0;
let totalPrice = 0; // Variable to track the total price of items in the cart
document.querySelector(".cartItems").style.display = "none";
// Listen for the "Add to Cart" button click event in the modal
document.querySelectorAll(".add_to_cart").forEach(function (button) {
  button.addEventListener("click", function (event) {
      // Prevent event propagation to parent elements
      event.stopPropagation();
      
      // Increment the cart count
      num++;
      document.querySelector("#cartNum").innerHTML = num;

      // Get the product details from the modal
      let modal = document.querySelector("#product-detail-modal");
      let productName = modal.querySelector("#product-name").innerText;
      let productPrice = parseFloat(modal.querySelector("#product-price").innerText.replace('Price: $', ''));
      let productImage = modal.querySelector("#product-image").src;
      if (productName && productPrice) {
          // Create a new row for the cart table
          let row = document.createElement("tr");

          // Set the row content
          row.innerHTML = `
              <td><img src="${productImage}" alt="Product Image" style="width: 50px; height: 50px;"></td>
              <td>${productName}</td>
              <td>$${productPrice.toFixed(2)}</td>
              <td>
                  <input type="number" value="1" min="1" class="quantity" onchange="updateTotal()">
              </td>
              <td class="item-total">$${productPrice.toFixed(2)}</td>
              <td><i class="fa fa-times cross" onclick="remove(this)" aria-hidden="true"></i></td>
          `;

          // Ensure #cart-items exists before appending the row
          let cartItems = document.querySelector("#cart-items");
          if (cartItems) {
              cartItems.appendChild(row);
          } else {
              console.error("#cart-items element not found.");
          }

          // Update the total price
          totalPrice += productPrice;
          document.querySelector(".total").innerHTML = "Total: $" + totalPrice.toFixed(2);
      } else {
          console.error("Product name or price not found.");
      }

      // Close the modal after adding the product to the cart
      modal.style.display = 'none';
  });
});

// To remove cart items
function remove(element) {
    let row = element.closest("tr");
    let price = parseFloat(row.querySelector(".item-total").innerText.replace('$', ''));
    
    // Decrement the cart count
    num--;
    document.querySelector("#cartNum").innerHTML = num;

    // Update the total price
    totalPrice -= price;
    document.querySelector(".total").innerHTML = "Total: $" + totalPrice.toFixed(2);

    // Remove the cart item row
    row.remove();

    // Hide the cart if no items are left
    if (num === 0) {
        document.querySelector("#cart-items").style.display = "none";
    }
}

// Update total price when quantity changes
function updateTotal() {
    let rows = document.querySelectorAll("#cart-items tr");
    totalPrice = 0;

    rows.forEach(function (row) {
        let quantity = row.querySelector(".quantity").value;
        let price = parseFloat(row.querySelector(".item-total").innerText.replace('$', ''));
        let itemTotal = price * quantity;

        row.querySelector(".item-total").innerText = `$${itemTotal.toFixed(2)}`;
        totalPrice += itemTotal;
    });

    document.querySelector(".total").innerHTML = "Total: $" + totalPrice.toFixed(2);
}









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
    alert("Thank you for contacting us! Redirecting to the index page...");
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

