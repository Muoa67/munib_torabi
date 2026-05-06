const addButtons = document.querySelectorAll(".add-btn");
const cartCount = document.getElementById("cart-count");
let cartTotal = 0;

addButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    cartTotal++;
    cartCount.textContent = cartTotal;

    alert(`${name} added to cart! ($${price.toFixed(2)})`);
  });
});

// Optional: simple fake contact form handler
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Thank you for reaching out! We'll get back to you soon.");
  e.target.reset();
});
