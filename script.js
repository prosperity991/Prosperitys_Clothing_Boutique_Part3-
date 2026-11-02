/* =========================================================
   PROSPERITY'S CLOTHING BOUTIQUE — PART 3 JAVASCRIPT
   Adds interactive tabs, FAQ accordion, image lightbox, map,
   dynamic products, search/sort, cart, and validated forms.
   ========================================================= */

"use strict";

const CONTACT_EMAIL = "hello@prosperitysboutique.co.za";
const PRODUCTS = [
  { id: 1, name: "Blush Midi Dress", category: "dresses", price: 799, image: "assets/dress.svg", description: "A soft, feminine midi dress for everyday elegance.", newArrival: false },
  { id: 2, name: "Satin Evening Gown", category: "occasion", price: 1299, image: "assets/gown.svg", description: "A statement gown designed for memorable occasions.", newArrival: true },
  { id: 3, name: "Classic Heels", category: "shoes", price: 699, image: "assets/shoes.svg", description: "A polished pair of heels to complete your outfit.", newArrival: false },
  { id: 4, name: "Structured Handbag", category: "accessories", price: 599, image: "assets/handbag.svg", description: "A practical structured bag with a sophisticated finish.", newArrival: true },
  { id: 5, name: "Rose Wrap Dress", category: "dresses", price: 849, image: "assets/dress2.svg", description: "A flattering wrap silhouette with a modern boutique feel.", newArrival: true },
  { id: 6, name: "Strappy Sandals", category: "shoes", price: 549, image: "assets/shoes2.svg", description: "Lightweight sandals for warm days and evening looks.", newArrival: true },
  { id: 7, name: "Mini Shoulder Bag", category: "accessories", price: 479, image: "assets/handbag2.svg", description: "A compact accessory for essentials and evenings out.", newArrival: false },
  { id: 8, name: "Occasion Jumpsuit", category: "occasion", price: 999, image: "assets/occasion.svg", description: "A confident alternative to the traditional occasion dress.", newArrival: true }
];

const money = value => `R${Number(value).toLocaleString("en-ZA")}`;

function getCart() {
  try {
    const stored = JSON.parse(localStorage.getItem("prosperityCart") || "[]");
    return Array.isArray(stored) ? stored.filter(item =>
      PRODUCTS.some(product => product.id === Number(item.id)) &&
      Number.isInteger(Number(item.quantity)) && Number(item.quantity) > 0
    ) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem("prosperityCart", JSON.stringify(cart));
  } catch {
    announce("Your browser could not save the cart. You can still browse this session.");
  }
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll(".cart-count").forEach(element => {
    element.textContent = count;
    element.setAttribute("aria-label", `${count} items in cart`);
  });
}

function announce(message) {
  let region = document.getElementById("live-region");
  if (!region) {
    region = document.createElement("div");
    region.id = "live-region";
    region.className = "sr-only";
    region.setAttribute("aria-live", "polite");
    document.body.appendChild(region);
  }
  region.textContent = message;
}

function addToCart(id) {
  const product = PRODUCTS.find(item => item.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ id, quantity: 1 });
  saveCart(cart);
  announce(`${product.name} added to your cart.`);
}

function changeQuantity(id, amount) {
  const cart = getCart();
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.quantity += amount;
  saveCart(cart.filter(entry => entry.quantity > 0));
  renderCart();
}

function removeFromCart(id) {
  saveCart(getCart().filter(item => item.id !== id));
  renderCart();
  announce("Product removed from your cart.");
}

function productCard(product) {
  return `
    <article class="product-card reveal">
      <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy" width="480" height="552"></div>
      <div class="product-body">
        <div class="product-category">${product.category.replace("-", " ")}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-price">${money(product.price)}</p>
        <button class="btn btn-primary add-cart" type="button" data-id="${product.id}">Add to cart</button>
      </div>
    </article>`;
}

function renderProducts(products, target, statusTarget) {
  const element = document.querySelector(target);
  if (!element) return;
  element.innerHTML = products.length
    ? products.map(productCard).join("")
    : '<div class="empty-state"><h3>No products found</h3><p>Try another search term or choose a different category.</p></div>';
  if (statusTarget) {
    const status = document.querySelector(statusTarget);
    if (status) status.textContent = `${products.length} product${products.length === 1 ? "" : "s"} displayed.`;
  }
  setupRevealAnimations(element);
}

function setupShop() {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;
  const search = document.querySelector("#search-input");
  const categoryFilter = document.querySelector("#category-filter");
  const sortFilter = document.querySelector("#sort-filter");
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category");
  if (requestedCategory && [...categoryFilter.options].some(option => option.value === requestedCategory)) {
    categoryFilter.value = requestedCategory;
  }

  function applyFilters() {
    const term = search.value.trim().toLocaleLowerCase();
    const category = categoryFilter.value;
    let filtered = PRODUCTS.filter(product => {
      const matchesTerm = `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase().includes(term);
      return matchesTerm && (category === "all" || product.category === category);
    });
    if (sortFilter.value === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sortFilter.value === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sortFilter.value === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    renderProducts(filtered, "#product-grid", "#product-status");
  }

  search.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);
  if (sortFilter) sortFilter.addEventListener("change", applyFilters);
  applyFilters();
}

function setupFeatured() {
  renderProducts(PRODUCTS.slice(0, 4), "#featured-products");
}

function setupNewArrivals() {
  renderProducts(PRODUCTS.filter(product => product.newArrival), "#new-arrivals-grid");
}

function renderCart() {
  const container = document.querySelector("#cart-content");
  if (!container) return;
  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = `<div class="empty-state"><h3>Your cart is empty.</h3><p>Browse the collection and add pieces you love.</p><a class="btn btn-primary" href="shop.html">Start shopping</a></div>`;
    return;
  }

  const items = cart.map(entry => {
    const product = PRODUCTS.find(item => item.id === entry.id);
    if (!product) return "";
    return `<article class="cart-item">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div><h3>${product.name}</h3><p>${money(product.price)} each</p><button class="text-link remove-item" type="button" data-id="${product.id}">Remove</button></div>
      <div><div class="quantity" aria-label="Quantity controls for ${product.name}">
        <button type="button" class="quantity-btn" data-id="${product.id}" data-change="-1" aria-label="Decrease ${product.name} quantity">−</button>
        <strong>${entry.quantity}</strong>
        <button type="button" class="quantity-btn" data-id="${product.id}" data-change="1" aria-label="Increase ${product.name} quantity">+</button>
      </div><p class="product-price">${money(product.price * entry.quantity)}</p></div>
    </article>`;
  }).join("");

  const total = cart.reduce((sum, entry) => {
    const product = PRODUCTS.find(item => item.id === entry.id);
    return sum + (product ? product.price * entry.quantity : 0);
  }, 0);
  container.innerHTML = `<div class="cart-layout"><div class="cart-items">${items}</div>
    <aside class="cart-summary" aria-labelledby="summary-title"><h3 id="summary-title">Order summary</h3>
      <div class="summary-row"><span>Items</span><span>${cart.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
      <div class="summary-row"><span>Subtotal</span><span>${money(total)}</span></div>
      <div class="summary-row"><span>Delivery</span><span>To be confirmed</span></div>
      <div class="summary-row summary-total"><span>Estimated total</span><span>${money(total)}</span></div>
      <a class="btn btn-primary" href="enquiry.html">Proceed to enquiry</a>
      <p class="status-message">This demonstration cart does not accept payments.</p>
    </aside></div>`;
}

function setupMobileMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  if (!button || !nav) return;
  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  });
}

function setupGlobalClicks() {
  document.addEventListener("click", event => {
    const addButton = event.target.closest(".add-cart");
    if (addButton) addToCart(Number(addButton.dataset.id));
    const quantityButton = event.target.closest(".quantity-btn");
    if (quantityButton) changeQuantity(Number(quantityButton.dataset.id), Number(quantityButton.dataset.change));
    const removeButton = event.target.closest(".remove-item");
    if (removeButton) removeFromCart(Number(removeButton.dataset.id));
  });
}

function setupTabs() {
  const buttons = document.querySelectorAll(".tab-button");
  if (!buttons.length) return;
  buttons.forEach(button => button.addEventListener("click", () => {
    buttons.forEach(tab => {
      const selected = tab === button;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
      const panel = document.getElementById(`tab-${tab.dataset.tab}`);
      if (panel) panel.hidden = !selected;
    });
  }));
}

function setupAccordion() {
  document.querySelectorAll(".accordion-trigger").forEach(button => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
      const symbol = button.querySelector("span");
      if (symbol) symbol.textContent = expanded ? "+" : "−";
    });
  });
}

function setupGallery() {
  const dialog = document.getElementById("gallery-lightbox");
  if (!dialog) return;
  const image = document.getElementById("lightbox-image");
  const caption = document.getElementById("lightbox-caption");
  document.querySelectorAll(".gallery-item").forEach(button => {
    button.addEventListener("click", () => {
      image.src = button.dataset.full;
      image.alt = button.querySelector("img").alt;
      caption.textContent = button.dataset.caption;
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });
  });
  dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
}

function setupRevealAnimations(root = document) {
  const items = root.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

function showFormError(form, message) {
  const output = form.querySelector('[role="status"]') || form.querySelector(".status-message");
  if (output) output.textContent = message;
}

function validateForm(form) {
  const fields = [...form.querySelectorAll("input, select, textarea")];
  for (const field of fields) {
    if (field.required && !field.value.trim()) {
      field.focus();
      field.setAttribute("aria-invalid", "true");
      showFormError(form, `Please complete the ${field.labels?.[0]?.textContent.trim() || field.name} field.`);
      return false;
    }
    if (field.type === "email" && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      field.focus();
      field.setAttribute("aria-invalid", "true");
      showFormError(form, "Please enter a valid email address.");
      return false;
    }
    if (field.minLength > 0 && field.value.trim().length < field.minLength) {
      field.focus();
      field.setAttribute("aria-invalid", "true");
      showFormError(form, `Please enter at least ${field.minLength} characters in ${field.name}.`);
      return false;
    }
    field.removeAttribute("aria-invalid");
  }
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  return true;
}

/* AJAX enhancement: FormSubmit's AJAX endpoint sends to the configured
   recipient after that mailbox has been activated with the provider.
   If the service is unavailable, a pre-filled email is opened instead. */
async function sendFormByAjax(form, subject, body) {
  const status = form.querySelector(".status-message");
  if (status) status.textContent = "Submitting your message…";
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        subject,
        message: body,
        _captcha: "false",
        _template: "table"
      })
    });
    if (!response.ok) throw new Error("Email service unavailable");
    const result = await response.json();
    if (result.success === "true" || result.success === true) {
      if (status) status.textContent = "Thank you. Your message was submitted successfully.";
      form.reset();
      return;
    }
    throw new Error("Email service did not confirm submission");
  } catch (error) {
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) status.textContent = "Online submission is not available. Your email application will open with the message prepared; please press Send there.";
    window.location.href = mailto;
  }
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!validateForm(form)) return;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const subject = form.elements.subject.value;
    const message = form.elements.message.value.trim();
    const body = `Name: ${name}\nEmail: ${email}\nMessage type: ${subject}\n\n${message}`;
    await sendFormByAjax(form, `Prosperity's Boutique: ${subject}`, body);
  });
}

function setupEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;
  // If the visitor came from the cart, include the selected products in the enquiry.
  const cart = getCart();
  if (cart.length) {
    const selected = cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return product ? `${product.name} (quantity: ${item.quantity})` : "";
    }).filter(Boolean).join(", ");
    const message = form.elements.message;
    message.value = `I would like to enquire about: ${selected}. Please confirm availability and final pricing.`;
  }
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!validateForm(form)) return;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const type = form.elements.type.value;
    const product = form.elements.product.value;
    const size = form.elements.size.value.trim() || "Not specified";
    const date = form.elements.date.value || "Not specified";
    const message = form.elements.message.value.trim();
    const body = `Name: ${name}\nEmail: ${email}\nEnquiry type: ${type}\nProduct: ${product}\nSize: ${size}\nDate needed: ${date}\n\nQuestion:\n${message}`;
    await sendFormByAjax(form, `Product enquiry: ${product}`, body);
  });
}

function setupMap() {
  const mapElement = document.getElementById("boutique-map");
  if (!mapElement || !window.L) return;
  // Town-centre reference only; no street address was supplied for the business.
  const map = L.map(mapElement).setView([-26.10, 27.77], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);
  L.marker([-26.10, 27.77]).addTo(map).bindPopup("Krugersdorp, Gauteng — town area reference");
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupMobileMenu();
  setupGlobalClicks();
  setupShop();
  setupFeatured();
  setupNewArrivals();
  renderCart();
  setupTabs();
  setupAccordion();
  setupGallery();
  setupContactForm();
  setupEnquiryForm();
  setupMap();
  setupRevealAnimations();
});
