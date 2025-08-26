/* ================= SELECT ELEMENTS ================= */
const itemInput = document.getElementById("item-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");
const totalPriceEl = document.getElementById("total-price");

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

let total = 0;

/* ================= SIDEBAR MENU ================= */
hamburger.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

/* ================= HEALTHY ALTERNATIVES ================= */
const unhealthyMap = {
  cola: "water",
  patatine: "carrots",
  cioccolato: "dark chocolate",
  biscotti: "wholegrain crackers"
};

/* ================= ADD ITEM ================= */
addBtn.addEventListener("click", () => {
  const item = itemInput.value.trim();
  const price = parseFloat(priceInput.value.trim());

  if (item && !isNaN(price)) {
    // Suggest healthier alternative
    let displayName = item;
    if (unhealthyMap[item.toLowerCase()]) {
      const suggestion = unhealthyMap[item.toLowerCase()];
      displayName += ` (Try instead: ${suggestion})`;
    }

    // Create list element
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${displayName} - ${price.toFixed(2)} €</span>
      <button>❌</button>
    `;

    // Remove item
    li.querySelector("button").addEventListener("click", () => {
      list.removeChild(li);
      total -= price;
      updateTotal();
    });

    list.appendChild(li);

    // Update total
    total += price;
    updateTotal();

    // Reset inputs
    itemInput.value = "";
    priceInput.value = "";
  }
});

/* ================= UPDATE TOTAL ================= */
function updateTotal() {
  totalPriceEl.textContent = total.toFixed(2);
}