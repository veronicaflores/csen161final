/*
  This is your site JavaScript code - you can add interactivity!
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎");

/* 
Make the "Click me!" button move when the visitor clicks it:
- First add the button to the page by following the steps in the TODO 🚧
*/
const btn = document.querySelector("button"); // Get the button from the page
if (btn) { // Detect clicks on the button
  btn.onclick = function () {
    // The 'dipped' class in style.css changes the appearance on click
    btn.classList.toggle("dipped");
  };
}


// ----- GLITCH STARTER PROJECT HELPER CODE -----

// Open file when the link in the preview is clicked
let goto = (file, line) => {
  window.parent.postMessage(
    { type: "glitch/go-to-line", payload: { filePath: file, line: line } }, "*"
  );
};
// Get the file opening button from its class name
const filer = document.querySelectorAll(".fileopener");
filer.forEach((f) => {
  f.onclick = () => { goto(f.dataset.file, f.dataset.line); };
});

// script.js

/// Function to handle adding items to the cart
function addToCart(productName, price) {
  // Retrieve existing cart items from local storage or initialize an empty array
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Add the new item to the cart
  cartItems.push({ name: productName, price: price });

  // Save the updated cart items back to local storage
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Update the cart count
  updateCartCount();

  // Display the items in the cart table
  displayCartItems(cartItems);
}

// Function to display the items in the cart table
function displayCartItems(cartItems) {
  let tableBody = document.querySelector('#cartTable tbody');
  tableBody.innerHTML = '';

  let total = 0;

  cartItems.forEach((item, index) => {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>1</td>
      <td><button class="deleteItem" data-index="${index}">Delete</button></td>
    `;
    tableBody.appendChild(row);

    // Add item price to total
    total += item.price;
  });

  // Update total amount in the total box
  document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;

  // Add event listeners to delete buttons
  document.querySelectorAll('.deleteItem').forEach(button => {
    button.addEventListener('click', () => {
      let index = parseInt(button.dataset.index);
      deleteCartItem(index);
    });
  });
}


// // Function to delete an item from the cart
// function deleteCartItem(index) {
//   let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//   cartItems.splice(index, 1); // Remove item at the specified index
//   localStorage.setItem('cart', JSON.stringify(cartItems)); // Save updated cart
//   updateCartCount(); // Update cart count
//   displayCartItems(cartItems); // Redisplay cart items
// }

// // Function to update the cart count displayed in the navigation bar
// function updateCartCount() {
//   let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//   document.getElementById('cartCount').textContent = cartItems.length;
// }

// // Add event listeners to all 'Add To Cart' buttons
// document.querySelectorAll('.addToCart').forEach(button => {
//   button.addEventListener('click', () => {
//     let productName = button.parentElement.querySelector('.name').textContent;
//     let price = parseFloat(button.parentElement.querySelector('.price').textContent.substring(1));
//     addToCart(productName, price);
//   });
// });

// // Call updateCartCount once the page loads to initialize the cart count
// window.addEventListener('load', () => {
//   updateCartCount();
//   // Retrieve cart items and display them in the table when the page loads
//   let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//   displayCartItems(cartItems);
// });
